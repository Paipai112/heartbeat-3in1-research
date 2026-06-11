import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { DescriptionRenderer } from "@/components/DescriptionRenderer";
import { ImplementationTabs } from "@/components/ImplementationTabs";
import { DependencyGraph } from "@/components/DependencyGraph";
import { ReferenceList } from "@/components/ReferenceList";
import { SectionDivider } from "@/components/SectionDivider";
import { ModuleCard } from "@/components/ModuleCard";
import { getModuleById, getModulesByIds, getReferencesByIds, getAllModules } from "@/lib/data-access";
import { getLayerById } from "@/data/layers";
import { getLayerHex } from "@/lib/colors";
import Link from "next/link";

interface ModuleDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllModules().map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: ModuleDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const mod = getModuleById(id);
  return {
    title: mod ? `${mod.name} - HeartBeat` : "未找到",
    description: mod?.summary ?? "",
  };
}

export default async function ModuleDetailPage({ params }: ModuleDetailPageProps) {
  const { id } = await params;
  const mod = getModuleById(id);

  if (!mod) notFound();

  const layer = getLayerById(mod.layer);
  const hex = getLayerHex(mod.layer);
  const dependsOn = getModulesByIds(mod.dependsOn);
  const feedsInto = getModulesByIds(mod.feedsInto);
  const references = getReferencesByIds(mod.references);

  // Calculate section numbers
  let sectionNum = 1;
  const inc = () => sectionNum++;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-24 pb-8">
        <div className="max-w-[72rem] mx-auto px-6 lg:px-8">
          <BreadcrumbNav
            items={[
              { label: "首页", href: "/" },
              { label: "模块", href: "/module" },
              { label: mod.name },
            ]}
          />

          <div className="mt-8">
            {/* Layer badge */}
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium mb-4"
              style={{
                color: hex,
                backgroundColor: hex + "15",
                border: `1px solid ${hex}30`,
              }}
            >
              {layer?.icon} {layer?.name}
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary leading-tight">
              {mod.name}
            </h1>

            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              {mod.summary}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {mod.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-surface-hover px-2.5 py-0.5 text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
              <span className="text-xs text-text-muted px-2 py-0.5">
                {mod.importance === "high" ? "核心模块" : mod.importance === "medium" ? "重要模块" : "辅助模块"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[72rem] mx-auto px-6 lg:px-8 pb-24 space-y-10">
        {/* 01 Overview */}
        <section>
          <h2
            className="font-heading text-xl font-semibold text-text-primary border-l-2 pl-4 mb-6"
            style={{ borderLeftColor: hex }}
          >
            {pad(inc())} 概述
          </h2>
          <div className="max-w-[85ch]">
            <DescriptionRenderer text={mod.description} />
          </div>
        </section>

        <SectionDivider />

        {/* 02 Principles (optional) */}
        {mod.principles && (
          <>
            <section>
              <h2
                className="font-heading text-xl font-semibold text-text-primary border-l-2 pl-4 mb-6"
                style={{ borderLeftColor: hex }}
              >
                {pad(inc())} 原理介绍
              </h2>
              <div className="max-w-[85ch]">
                <DescriptionRenderer text={mod.principles} />
              </div>
            </section>
            <SectionDivider />
          </>
        )}

        {/* 03 Dependency Graph */}
        <section>
          <h2
            className="font-heading text-xl font-semibold text-text-primary border-l-2 pl-4 mb-6"
            style={{ borderLeftColor: hex }}
          >
            {pad(inc())} 依赖关系
          </h2>
          <DependencyGraph moduleId={mod.id} />
        </section>

        <SectionDivider />

        {/* 04 Depends On / Feeds Into */}
        <section>
          <h2
            className="font-heading text-xl font-semibold text-text-primary border-l-2 pl-4 mb-6"
            style={{ borderLeftColor: hex }}
          >
            {pad(inc())} 依赖与供给
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border-subtle bg-surface-elevated p-6">
              <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">
                依赖模块 ({dependsOn.length})
              </h3>
              {dependsOn.length === 0 ? (
                <p className="text-sm text-text-muted">无 — 此为传感器层硬件模块</p>
              ) : (
                <div className="space-y-2">
                  {dependsOn.map((dm) => (
                    <Link
                      key={dm.id}
                      href={`/module/${dm.id}`}
                      className="block rounded-lg px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
                    >
                      {dm.name}
                      <span className="ml-2 text-xs text-text-muted">{dm.layer}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border-subtle bg-surface-elevated p-6">
              <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">
                供给模块 ({feedsInto.length})
              </h3>
              {feedsInto.length === 0 ? (
                <p className="text-sm text-text-muted">无 — 此为顶层 AI 教练模块</p>
              ) : (
                <div className="space-y-2">
                  {feedsInto.map((fm) => (
                    <Link
                      key={fm.id}
                      href={`/module/${fm.id}`}
                      className="block rounded-lg px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
                    >
                      {fm.name}
                      <span className="ml-2 text-xs text-text-muted">{fm.layer}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 05 Implementations */}
        {mod.implementations.length > 0 && (
          <>
            <SectionDivider />
            <section>
              <h2
                className="font-heading text-xl font-semibold text-text-primary border-l-2 pl-4 mb-6"
                style={{ borderLeftColor: hex }}
              >
                {pad(inc())} 实现方案
              </h2>
              <ImplementationTabs implementations={mod.implementations} />
            </section>
          </>
        )}

        {/* References */}
        {references.length > 0 && (
          <>
            <SectionDivider />
            <section>
              <h2
                className="font-heading text-xl font-semibold text-text-primary border-l-2 pl-4 mb-6"
                style={{ borderLeftColor: hex }}
              >
                参考文献
              </h2>
              <ReferenceList references={references} />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
