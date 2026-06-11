import { getAllLayers } from "@/data/layers";
import { getLayerHex } from "@/lib/colors";
import { getModuleCount } from "@/lib/data-access";

export function CategoryNavigation() {
  const layers = getAllLayers();

  return (
    <div className="flex flex-wrap gap-2">
      {/* "All" chip */}
      <span className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm
                       bg-surface-highlight text-text-primary border border-border-default">
        全部
        <span className="ml-1 text-xs text-text-muted">
          {layers.reduce((sum, l) => sum + getModuleCount(l.id), 0)}
        </span>
      </span>

      {layers.map((layer) => {
        const hex = getLayerHex(layer.id);
        const count = getModuleCount(layer.id);
        return (
          <button
            key={layer.id}
            type="button"
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm
                       bg-surface-elevated text-text-secondary border border-border-subtle
                       hover:bg-surface-highlight hover:border-white/10 hover:text-text-primary
                       transition-colors duration-150"
            style={{
              ["--layer-color" as string]: hex,
            }}
          >
            <span>{layer.icon}</span>
            {layer.name}
            <span className="ml-1 text-xs text-text-muted">({count})</span>
          </button>
        );
      })}
    </div>
  );
}
