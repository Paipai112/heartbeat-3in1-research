import { Breadcrumb } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";
import { sources } from "@/data/sources";

const typeConfig: Record<string, { label: string; color: string }> = {
  academic: { label: "学术论文", color: "text-blue-400" },
  news: { label: "新闻报道", color: "text-amber-400" },
  product: { label: "产品页面", color: "text-green-400" },
  datasheet: { label: "芯片数据手册", color: "text-purple-400" },
  report: { label: "行业报告", color: "text-cyan-400" },
};

export default function SourcesPage() {
  const types = ["academic", "news", "product", "datasheet", "report"] as const;

  return (
    <div className="page-enter">
      <PageHero
        title="参考来源"
        titleGradient="数据溯源"
        subtitle="报告中所有商业数据、技术参数与研究的原始出处"
        description="本报告所有市场数据、技术参数、研究结论均有明确来源。鼠标悬停报告中任意数据点可查看来源简述，点击可跳转至对应原始链接。"
        badge={{ text: "References & Sources", color: "teal" }}
      />

      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "首页", href: "/" }, { label: "参考来源" }]}
          />

          {/* How citations work */}
          <div className="glass-card-elevated p-8 mb-16 glow-teal">
            <h2 className="font-heading text-lg font-bold text-white mb-3">
              如何使用本页
            </h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              报告中的数据和关键结论均以下划线标注，鼠标悬停可显示来源简述和发布日期，
              点击跳转至原始出处。本页汇总了所有引用来源，按类型分组，方便系统性查阅。
              每个条目包含标题、出处、发布日期和内容摘要，点击标题即可访问原始链接。
            </p>
          </div>

          {types.map((type) => {
            const config = typeConfig[type];
            const items = sources.filter((s) => s.type === type);
            if (items.length === 0) return null;

            return (
              <div key={type} className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className={"font-heading text-xl font-bold " + config.color}>
                    {config.label}
                  </h2>
                  <span className="text-xs text-[#475569]">
                    {items.length} 条来源
                  </span>
                </div>

                <div className="grid gap-4">
                  {items.map((source) => (
                    <a
                      key={source.id}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card group p-5 flex gap-4 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer hover:border-green-500/20"
                    >
                      <div className="shrink-0 w-2 h-2 rounded-full bg-green-500/40 mt-2 group-hover:bg-green-400 transition-colors" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white group-hover:text-green-400 transition-colors truncate">
                          {source.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 mb-2">
                          <span className="text-xs text-[#64748B]">
                            {source.publisher}
                          </span>
                          <span className="text-[#334155]">·</span>
                          <span className="text-xs text-[#475569] font-mono">
                            {source.date}
                          </span>
                        </div>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          {source.summary}
                        </p>
                      </div>
                      <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#4ADE80"
                          strokeWidth={2}
                        >
                          <path d="M7 17L17 7M7 7h10v10" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}

          {sources.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#64748B]">来源数据加载中...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
