import { PageHero } from "@/components/PageHero";
import { getAllReferences } from "@/lib/data-access";
import { ReferenceList } from "@/components/ReferenceList";

export default function ReferencesPage() {
  const refs = getAllReferences();

  return (
    <div className="animate-fade-in">
      <PageHero
        title="参考文献"
        titleGradient="Source Attribution"
        subtitle="所有知识模块的数据溯源 — 学术论文、产品页面、芯片数据手册与行业报告"
        badge={{ text: "References", color: "#C084FC" }}
      />

      <section className="py-20">
        <div className="max-w-[72rem] mx-auto px-6 lg:px-8">
          <div className="glass-elevated rounded-2xl p-8 mb-10">
            <p className="text-sm text-text-secondary leading-relaxed">
              本文档中的所有知识模块均标注了引用来源。正文中的{" "}
              <code className="text-[#C084FC] bg-[#C084FC]/10 px-1 py-0.5 rounded text-xs font-mono">
                [ref-xxx]
              </code>{" "}
              标记均可在此页面找到对应的完整引用信息。
            </p>
          </div>

          <ReferenceList references={refs} />
        </div>
      </section>
    </div>
  );
}
