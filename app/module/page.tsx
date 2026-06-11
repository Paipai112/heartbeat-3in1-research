import { PageHero } from "@/components/PageHero";
import { ModuleCard } from "@/components/ModuleCard";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { getAllModules, getModuleCount } from "@/lib/data-access";

export default function ModuleListPage() {
  const modules = getAllModules();

  return (
    <div className="animate-fade-in">
      <PageHero
        title="模块"
        titleGradient="Knowledge Graph"
        subtitle="从传感器硬件到 AI 教练决策 — 五层结构化知识模块"
        description={`共 ${modules.length} 个模块，覆盖 L1 传感器至 L5 AI 教练全链路`}
        badge={{ text: "Module Index", color: "#4ADE80" }}
      />

      <section className="py-16">
        <div className="max-w-[72rem] mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <CategoryNavigation />
          </div>

          {modules.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border-subtle p-16 text-center text-text-muted">
              <p>模块数据加载中...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((mod) => (
                <ModuleCard key={mod.id} module={mod} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
