import Link from "next/link";
import { PageHero } from "@/components/PageHero";
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

const categories = [
  "physiology",
  "technology",
  "sensor",
  "algorithm",
  "business",
  "medical",
] as const;

export default function GlossaryIndexPage() {
  return (
    <div className="animate-fade-in">
      <PageHero
        title="术语辞典"
        titleGradient="HeartBeat Knowledge Base"
        subtitle="专业术语速查 — 覆盖运动生理、传感器技术、算法与医疗认证"
        description="点击任意术语进入详解页面，了解完整的定义、技术原理与相关知识关联。"
        badge={{ text: "Glossary", color: "#60A5FA" }}
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-[72rem] mx-auto px-6 lg:px-8">
          {categories.map((cat) => {
            const terms = glossaryTerms.filter((t: GlossaryTerm) => t.category === cat);
            if (terms.length === 0) return null;
            const label = categoryConfig[cat] ?? cat;

            return (
              <div key={cat} className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="font-heading text-xl font-bold text-text-primary">
                    {label}
                  </h2>
                  <span className="text-xs text-text-muted">
                    {terms.length} 个术语
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {terms.map((term: GlossaryTerm) => (
                    <Link
                      key={term.id}
                      href={`/glossary/${term.id}`}
                      className="group block rounded-2xl border border-border-subtle bg-surface-elevated p-5 transition-all duration-200 hover:border-white/10 hover:-translate-y-[2px] hover:shadow-card-hover"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-sm font-heading font-semibold text-text-primary group-hover:text-[#60A5FA] transition-colors">
                            {term.term.split(" (")[0]}
                          </h3>
                          {term.term.includes("(") && (
                            <p className="text-xs text-text-muted font-mono mt-0.5">
                              {term.term.match(/\(([^)]+)\)/)?.[1] ?? ""}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed mb-2">
                        {term.definition}
                      </p>
                      <span className="text-xs text-[#60A5FA] opacity-0 group-hover:opacity-100 transition-opacity">
                        查看详情 →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {glossaryTerms.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted">术语数据加载中...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
