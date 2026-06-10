import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { glossaryTerms } from "@/data/glossary";

const categoryConfig: Record<
  string,
  { label: string; badgeClass: string }
> = {
  physiology: {
    label: "运动生理",
    badgeClass: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  technology: {
    label: "技术原理",
    badgeClass: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  },
  sensor: {
    label: "传感器",
    badgeClass: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  algorithm: {
    label: "算法",
    badgeClass: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  business: {
    label: "商业/认证",
    badgeClass: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  medical: {
    label: "医学标准",
    badgeClass: "bg-red-500/20 text-red-400 border-red-500/30",
  },
};

export function generateStaticParams() {
  return glossaryTerms.map((t) => ({ slug: t.slug }));
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = glossaryTerms.find((t) => t.slug === slug);

  if (!term) {
    notFound();
  }

  const config = categoryConfig[term.category] ?? {
    label: term.category,
    badgeClass:
      "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  const relatedTerms = term.relatedSlugs
    .map((s) => glossaryTerms.find((t) => t.slug === s))
    .filter(Boolean);

  return (
    <div className="page-enter">
      {/* Hero section */}
      <section className="bg-[#020617] pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "首页", href: "/" },
              { label: "术语辞典", href: "/glossary" },
              { label: term.term },
            ]}
          />

          <div className="flex items-start gap-4 mt-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                  {term.term}
                </h1>
                <span
                  className={
                    "text-xs px-2.5 py-1 rounded-full border " +
                    config.badgeClass
                  }
                >
                  {config.label}
                </span>
              </div>
              <p className="text-lg text-[#64748B] font-mono">{term.termEn}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="bg-[#020617] pb-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="glass-card-elevated p-8 glow-green">
            <p className="text-lg text-white leading-relaxed">
              {term.definition}
            </p>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="bg-[#020617] pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-heading text-xl font-bold text-white mb-6">
            详细说明
          </h2>
          <div className="prose prose-invert max-w-none">
            {term.detail.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-sm text-[#94A3B8] leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Related Terms */}
      {relatedTerms.length > 0 && (
        <section className="bg-[#0A1120] py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="font-heading text-xl font-bold text-white mb-6">
              相关术语
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedTerms.map((rt) => {
                if (!rt) return null;
                const rconfig = categoryConfig[rt.category] ?? {
                  label: rt.category,
                  badgeClass:
                    "bg-gray-500/20 text-gray-400 border-gray-500/30",
                };
                return (
                  <Link
                    key={rt.slug}
                    href={"/glossary/" + rt.slug}
                    className="glass-card group p-5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer hover:border-green-500/20"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-white group-hover:text-green-400 transition-colors">
                        {rt.term}
                      </h3>
                      <span
                        className={
                          "text-xs px-2 py-0.5 rounded-full border " +
                          rconfig.badgeClass
                        }
                      >
                        {rconfig.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] font-mono mb-1">
                      {rt.termEn}
                    </p>
                    <p className="text-xs text-[#94A3B8]">{rt.definition}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="bg-[#020617] py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 flex gap-4">
          <Link
            href="/glossary"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white hover:bg-white/10 px-6 py-2.5 transition-colors text-sm"
          >
            ← 返回术语辞典
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white hover:bg-white/10 px-6 py-2.5 transition-colors text-sm"
          >
            返回首页
          </Link>
        </div>
      </section>
    </div>
  );
}
