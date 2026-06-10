import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";
import { glossaryTerms } from "@/data/glossary";

const categoryConfig: Record<
  string,
  {
    label: string;
    color: string;
    bgClass: string;
    badgeClass: string;
  }
> = {
  physiology: {
    label: "运动生理",
    color: "text-green-400",
    bgClass: "bg-green-500/10",
    badgeClass: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  technology: {
    label: "技术原理",
    color: "text-cyan-400",
    bgClass: "bg-cyan-500/10",
    badgeClass: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  },
  sensor: {
    label: "传感器",
    color: "text-blue-400",
    bgClass: "bg-blue-500/10",
    badgeClass: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  algorithm: {
    label: "算法",
    color: "text-purple-400",
    bgClass: "bg-purple-500/10",
    badgeClass: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  business: {
    label: "商业/认证",
    color: "text-amber-400",
    bgClass: "bg-amber-500/10",
    badgeClass: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  medical: {
    label: "医学标准",
    color: "text-red-400",
    bgClass: "bg-red-500/10",
    badgeClass: "bg-red-500/20 text-red-400 border-red-500/30",
  },
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
    <div className="page-enter">
      <PageHero
        title="术语辞典"
        titleGradient="HeartBeat 技术调研"
        subtitle="专业术语速查 — 覆盖运动生理、传感器技术、算法与医疗认证"
        description="点击任意术语进入详解页面，了解完整的定义、技术原理与相关知识关联。"
        badge={{ text: "Glossary", color: "teal" }}
      />

      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "首页", href: "/" }, { label: "术语辞典" }]}
          />

          {categories.map((cat) => {
            const config = categoryConfig[cat];
            const terms = glossaryTerms.filter((t) => t.category === cat);
            if (terms.length === 0) return null;
            return (
              <div key={cat} className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <h2
                    className={
                      "font-heading text-xl font-bold " + config.color
                    }
                  >
                    {config.label}
                  </h2>
                  <span className="text-xs text-[#475569]">
                    {terms.length} 个术语
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {terms.map((term) => (
                    <Link
                      key={term.slug}
                      href={"/glossary/" + term.slug}
                      className="glass-card group p-5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer hover:border-green-500/20"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-sm font-semibold text-white group-hover:text-green-400 transition-colors">
                            {term.term}
                          </h3>
                          <p className="text-xs text-[#64748B] font-mono mt-0.5">
                            {term.termEn}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-[#94A3B8] leading-relaxed mb-2">
                        {term.definition}
                      </p>
                      <span className="text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
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
              <p className="text-[#64748B]">术语数据加载中...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
