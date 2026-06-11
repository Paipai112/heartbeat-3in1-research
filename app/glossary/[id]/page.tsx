import Link from "next/link";
import { notFound } from "next/navigation";
import { glossaryTerms } from "@/data/glossary";
import { GlossaryTerm } from "@/lib/types";

const categoryConfig: Record<string, string> = {
  physiology: "运动生理",
  technology: "技术原理",
  sensor: "传感器",
  algorithm: "算法",
  business: "商业/认证",
  medical: "医学标准",
};

export function generateStaticParams() {
  return glossaryTerms.map((t) => ({ id: t.id }));
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const term = glossaryTerms.find((t: GlossaryTerm) => t.id === id);

  if (!term) notFound();

  const categoryLabel = categoryConfig[term.category] ?? term.category;

  const relatedTerms = term.references
    .map((refId) => glossaryTerms.find((t: GlossaryTerm) => t.id === refId))
    .filter((t): t is GlossaryTerm => t !== undefined);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-24 pb-12">
        <div className="max-w-[72rem] mx-auto px-6 lg:px-8">
          <Link
            href="/glossary"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 3L5 7l4 4" />
            </svg>
            返回术语辞典
          </Link>

          <div className="flex items-start gap-4 mt-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
                  {term.term.split(" (")[0]}
                </h1>
                <span className="text-xs px-2.5 py-1 rounded-full border border-border-default bg-surface-elevated text-text-secondary">
                  {categoryLabel}
                </span>
              </div>
              {term.term.includes("(") && (
                <p className="text-sm text-text-muted font-mono">
                  {term.term.match(/\(([^)]+)\)/)?.[1] ?? ""}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="pb-8">
        <div className="max-w-[72rem] mx-auto px-6 lg:px-8">
          <div className="glass-elevated rounded-2xl p-8">
            <p className="text-lg text-text-primary leading-relaxed">
              {term.definition}
            </p>
          </div>
        </div>
      </section>

      {/* Detail */}
      {term.detail && (
        <section className="pb-20">
          <div className="max-w-[72rem] mx-auto px-6 lg:px-8">
            <h2 className="font-heading text-xl font-bold text-text-primary mb-6">
              详细说明
            </h2>
            <div className="space-y-4">
              {term.detail.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm text-text-secondary leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Terms */}
      {relatedTerms.length > 0 && (
        <section className="border-t border-border-subtle py-16">
          <div className="max-w-[72rem] mx-auto px-6 lg:px-8">
            <h2 className="font-heading text-xl font-bold text-text-primary mb-6">
              相关术语
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedTerms.map((rt) => {
                const rCatLabel = categoryConfig[rt.category] ?? rt.category;
                return (
                  <Link
                    key={rt.id}
                    href={`/glossary/${rt.id}`}
                    className="group block rounded-2xl border border-border-subtle bg-surface-elevated p-5 transition-all duration-200 hover:border-white/10 hover:-translate-y-[2px] hover:shadow-card-hover"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-heading font-semibold text-text-primary group-hover:text-[#60A5FA] transition-colors">
                        {rt.term.split(" (")[0]}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full border border-border-subtle bg-surface-hover text-text-muted">
                        {rCatLabel}
                      </span>
                    </div>
                    {rt.term.includes("(") && (
                      <p className="text-xs text-text-muted font-mono mb-1">
                        {rt.term.match(/\(([^)]+)\)/)?.[1] ?? ""}
                      </p>
                    )}
                    <p className="text-xs text-text-secondary">{rt.definition}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="pb-16">
        <div className="max-w-[72rem] mx-auto px-6 lg:px-8 flex gap-4">
          <Link
            href="/glossary"
            className="inline-flex items-center gap-2 rounded-full border border-border-default text-text-secondary hover:text-text-primary hover:bg-surface-hover px-6 py-2.5 transition-colors text-sm"
          >
            ← 返回术语辞典
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border-default text-text-secondary hover:text-text-primary hover:bg-surface-hover px-6 py-2.5 transition-colors text-sm"
          >
            返回首页
          </Link>
        </div>
      </section>
    </div>
  );
}
