"use client";

import { useState } from "react";
import { Implementation } from "@/lib/types";
import { CitationLink } from "@/components/TermLink";

interface ImplementationTabsProps {
  implementations: Implementation[];
}

export function ImplementationTabs({ implementations }: ImplementationTabsProps) {
  const [tab, setTab] = useState<"mainstream" | "advanced">("mainstream");

  const visible = implementations.filter((impl) => impl.type === tab);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-surface-hover border border-border-subtle w-fit">
        <button
          type="button"
          onClick={() => setTab("mainstream")}
          className={`px-4 py-1.5 rounded-lg text-sm transition-colors duration-150 ${
            tab === "mainstream"
              ? "bg-surface-elevated text-text-primary border border-border-subtle"
              : "text-text-muted hover:text-text-secondary"
          }`}
        >
          主流方案
          <span className="ml-1.5 text-xs text-text-muted">
            ({implementations.filter((i) => i.type === "mainstream").length})
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTab("advanced")}
          className={`px-4 py-1.5 rounded-lg text-sm transition-colors duration-150 ${
            tab === "advanced"
              ? "bg-surface-elevated text-text-primary border border-border-subtle"
              : "text-text-muted hover:text-text-secondary"
          }`}
        >
          进阶方案
          <span className="ml-1.5 text-xs text-text-muted">
            ({implementations.filter((i) => i.type === "advanced").length})
          </span>
        </button>
      </div>

      {/* Content */}
      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-subtle p-12 text-center text-text-muted">
          <p>暂无{tab === "mainstream" ? "主流" : "进阶"}方案</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {visible.map((impl, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border-subtle bg-surface-elevated p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-heading font-semibold text-text-primary">
                  {impl.name}
                </span>
                <span className="text-xs text-text-muted font-mono">
                  {impl.vendor}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {impl.description}
              </p>

              {/* Pros */}
              {impl.pros.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-[#4ADE80] mb-1">优势</p>
                  <ul className="space-y-0.5">
                    {impl.pros.map((pro, j) => (
                      <li key={j} className="text-xs text-text-secondary flex gap-1.5">
                        <span className="text-[#4ADE80] shrink-0">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cons */}
              {impl.cons.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-[#FFB347] mb-1">局限</p>
                  <ul className="space-y-0.5">
                    {impl.cons.map((con, j) => (
                      <li key={j} className="text-xs text-text-secondary flex gap-1.5">
                        <span className="text-[#FFB347] shrink-0">!</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Citations */}
              {impl.citations.length > 0 && (
                <div className="text-xs text-text-muted">
                  {impl.citations.map((refId, j) => (
                    <span key={refId}>
                      {j > 0 && ", "}
                      <CitationLink refId={refId} />
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
