import Link from "next/link";
import { getAllLayers } from "@/data/layers";
import { getAllModules } from "@/lib/data-access";
import { getLayerHex, getLayerBadgeBg } from "@/lib/colors";

function BentoCard({
  layerId,
  name,
  icon,
  color,
  count,
  previewModules,
  span = "1",
}: {
  layerId: string;
  name: string;
  icon: string;
  color: string;
  count: number;
  previewModules: { id: string; name: string }[];
  span?: "1" | "2";
}) {
  const rowClass = span === "2" ? "row-span-2" : "";

  return (
    <Link
      href={`/module?layer=${layerId}`}
      className={`group relative overflow-hidden rounded-3xl border border-border-subtle bg-surface-elevated ${rowClass}
                  transition-all duration-300
                  hover:border-white/10 hover:-translate-y-[2px] hover:shadow-card-hover`}
      style={{ ["--layer-color" as string]: color }}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${color}10 0%, transparent 60%)`,
        }}
      />

      <div className="relative p-8 h-full flex flex-col">
        {/* Layer badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            style={{ color, backgroundColor: getLayerBadgeBg(layerId), border: `1px solid ${color}30` }}
          >
            <span>{icon}</span> {name}
          </span>
          <span className="text-xs text-text-muted font-mono">{count} 模块</span>
        </div>

        {/* Module preview list */}
        <div className="flex-1 space-y-2">
          {previewModules.length > 0 ? (
            previewModules.map((mod) => (
              <div
                key={mod.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-text-secondary group-hover:text-text-body transition-colors"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="truncate">{mod.name}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-text-muted italic">模块数据加载中...</p>
          )}
        </div>

        {/* View all link */}
        <div className="mt-4 flex items-center gap-1 text-xs font-medium transition-colors"
             style={{ color }}>
          浏览全部
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 3l3 3-3 3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const layers = getAllLayers();
  const modules = getAllModules();

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(96, 165, 250, 0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(192, 132, 252, 0.04) 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-[72rem] mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 px-3 py-1 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60A5FA] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60A5FA]" />
            </span>
            <span className="text-xs text-text-secondary">HeartBeat Knowledge Base</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary leading-tight tracking-tight">
            下一代运动传感器
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #60A5FA 0%, #C084FC 100%)",
              }}
            >
              五层知识体系
            </span>
          </h1>

          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            从传感器硬件到 AI 教练决策，系统化解析 ECG 心率、BioZ 呼吸、核心体温与汗液分析技术。
            每一个模块都是一段可追溯、可验证的结构化知识。
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/module"
              className="rounded-full bg-white/10 px-6 py-3 text-sm text-text-primary font-medium
                         border border-white/10 hover:bg-white/15 hover:border-white/20
                         transition-all duration-200"
            >
              探索模块
            </Link>
            <Link
              href="/glossary"
              className="rounded-full px-6 py-3 text-sm text-text-secondary font-medium
                         border border-border-subtle hover:border-white/10 hover:text-text-primary
                         transition-all duration-200"
            >
              术语辞典
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { value: modules.length.toString(), label: "知识模块" },
              { value: "5", label: "层级分类" },
              { value: "150+", label: "参考文献" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border-subtle bg-surface-elevated/50 p-4"
              >
                <p className="text-2xl font-heading font-bold text-text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-[72rem] mx-auto px-6 lg:px-8 pb-24">
        <div className="mb-10">
          <h2 className="font-heading text-2xl font-bold text-text-primary">知识层级</h2>
          <p className="text-sm text-text-secondary mt-2">
            从底层传感器到顶层 AI 教练，五层模型覆盖运动传感器全链路
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(200px,auto)] gap-4">
          {layers.map((layer) => {
            const layerModules = modules
              .filter((m) => m.layer === layer.id)
              .slice(0, layer.id === "L3" || layer.id === "L5" ? 6 : 4)
              .map((m) => ({ id: m.id, name: m.name }));

            const isBig = layer.id === "L3" || layer.id === "L5";

            return (
              <BentoCard
                key={layer.id}
                layerId={layer.id}
                name={layer.name}
                icon={layer.icon}
                color={layer.color}
                count={getAllModules().filter((m) => m.layer === layer.id).length}
                previewModules={layerModules}
                span={isBig ? "2" : "1"}
              />
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border-subtle">
        <div className="max-w-[72rem] mx-auto px-6 lg:px-8 py-20 text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary">
            从芯片到教练决策
          </h2>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto leading-relaxed">
            HeartBeat 知识库定义了从 MAX30001 心电芯片到 AI 教练训练建议的完整知识图谱。
            运动传感器领域的第一本结构化百科全书。
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://github.com/Paipai112/heartbeat-3in1-research"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 px-6 py-3 text-sm text-text-primary font-medium
                         border border-white/10 hover:bg-white/15 transition-all"
            >
              GitHub
            </a>
            <Link
              href="/references"
              className="rounded-full px-6 py-3 text-sm text-text-secondary font-medium
                         border border-border-subtle hover:border-white/10 hover:text-text-primary
                         transition-all"
            >
              参考文献
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
