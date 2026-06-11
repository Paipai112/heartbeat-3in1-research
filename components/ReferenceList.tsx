import { Reference } from "@/lib/types";

const typeConfig: Record<string, { label: string; icon: string }> = {
  paper: { label: "学术论文", icon: "📄" },
  website: { label: "网站", icon: "🌐" },
  patent: { label: "专利", icon: "📜" },
  documentation: { label: "文档", icon: "📖" },
  book: { label: "书籍", icon: "📕" },
};

const typeOrder = ["paper", "documentation", "website", "patent", "book"];

interface ReferenceListProps {
  references: Reference[];
}

export function ReferenceList({ references }: ReferenceListProps) {
  if (references.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border-subtle p-12 text-center text-text-muted">
        <p>暂无参考文献</p>
      </div>
    );
  }

  // Group by type
  const grouped = new Map<string, Reference[]>();
  for (const ref of references) {
    const group = grouped.get(ref.type) ?? [];
    group.push(ref);
    grouped.set(ref.type, group);
  }

  // Sort groups by typeOrder
  const sortedGroups = typeOrder.filter((t) => grouped.has(t));

  return (
    <div className="space-y-8">
      {sortedGroups.map((type) => {
        const refs = grouped.get(type)!;
        const config = typeConfig[type] ?? { label: type, icon: "📌" };

        return (
          <section key={type}>
            <h3 className="text-sm font-heading font-semibold text-text-primary mb-3 flex items-center gap-2">
              <span aria-hidden="true">{config.icon}</span>
              {config.label}
              <span className="text-xs text-text-muted font-normal">
                ({refs.length})
              </span>
            </h3>

            <div className="space-y-2">
              {refs.map((ref) => (
                <div
                  key={ref.id}
                  id={ref.id}
                  className="rounded-xl border border-border-subtle bg-surface-elevated p-4 scroll-mt-20"
                >
                  {/* Title */}
                  <p className="text-sm font-medium text-text-primary">
                    {ref.url ? (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#60A5FA] transition-colors"
                      >
                        {ref.title}
                      </a>
                    ) : (
                      ref.title
                    )}
                  </p>

                  {/* Authors + Year */}
                  <p className="mt-1 text-xs text-text-muted">
                    {ref.authors && <span>{ref.authors}</span>}
                    {ref.authors && ref.year && <span> · </span>}
                    {ref.year && <span>{ref.year}</span>}
                    {ref.doi && (
                      <span>
                        {" · "}DOI:{" "}
                        <a
                          href={`https://doi.org/${ref.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#60A5FA] transition-colors"
                        >
                          {ref.doi}
                        </a>
                      </span>
                    )}
                  </p>

                  {/* Chinese summary */}
                  {ref.zhSummary && (
                    <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                      {ref.zhSummary}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
