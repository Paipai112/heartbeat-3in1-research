import Link from "next/link";
import { Module } from "@/lib/types";
import { getLayerById } from "@/data/layers";
import { getLayerHex, getLayerBadgeBg } from "@/lib/colors";

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const layer = getLayerById(module.layer);
  const hex = getLayerHex(module.layer);
  const badgeBg = getLayerBadgeBg(module.layer);

  return (
    <Link
      href={`/module/${module.id}`}
      className="group block rounded-2xl border border-border-subtle bg-surface-elevated p-6
                 transition-all duration-200
                 hover:bg-surface-highlight hover:border-white/10
                 hover:-translate-y-[2px] hover:shadow-card-hover"
    >
      {/* Layer badge */}
      <span
        className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
        style={{ color: hex, backgroundColor: badgeBg, border: `1px solid ${hex}30` }}
      >
        {layer?.icon} {layer?.name}
      </span>

      <h3 className="mt-3 text-lg font-heading font-semibold text-text-primary group-hover:text-white transition-colors">
        {module.name}
      </h3>

      <p className="mt-2 text-sm text-text-secondary line-clamp-2 leading-relaxed">
        {module.summary}
      </p>

      {module.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {module.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface-hover px-2 py-0.5 text-xs text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Importance indicator */}
      <div className="mt-4 flex items-center gap-2">
        {module.importance === "high" && (
          <span className="text-[10px] text-layer-1 font-mono uppercase tracking-wider">核心</span>
        )}
        {module.importance === "medium" && (
          <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider">重要</span>
        )}
        <span className="text-[10px] text-text-muted font-mono">
          {module.dependsOn.length} 依赖 · {module.feedsInto.length} 输出
        </span>
      </div>
    </Link>
  );
}
