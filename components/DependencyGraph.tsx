"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { getModuleById, getModulesByIds } from "@/lib/data-access";
import { getLayerById } from "@/data/layers";
import { getLayerHex } from "@/lib/colors";

interface DependencyGraphProps {
  moduleId: string;
}

interface GraphNode {
  id: string;
  name: string;
  layer: string;
  x: number;
  y: number;
  color: string;
}

interface GraphEdge {
  from: string;
  to: string;
}

const NODE_W = 140;
const NODE_H = 40;
const LAYER_GAP = 100;
const NODE_GAP_X = 30;
const NODE_GAP_Y = 30;

export function DependencyGraph({ moduleId }: DependencyGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const module = getModuleById(moduleId);
  if (!module) {
    return (
      <div className="rounded-2xl border border-dashed border-border-subtle p-12 text-center text-text-muted">
        <p>模块数据不可用</p>
      </div>
    );
  }

  // Build subgraph: includes the module, its dependencies, and what it feeds into
  const nodeIds = new Set<string>([moduleId]);
  for (const dep of module.dependsOn) nodeIds.add(dep);
  for (const feed of module.feedsInto) nodeIds.add(feed);

  const allNodes = Array.from(nodeIds)
    .map((id) => {
      const m = id === moduleId ? module : getModuleById(id);
      if (!m) return null;
      const layer = getLayerById(m.layer);
      return {
        id: m.id,
        name: m.name,
        layer: m.layer,
        x: 0,
        y: 0,
        color: getLayerHex(m.layer),
      } satisfies GraphNode;
    })
    .filter((n): n is GraphNode => n !== null);

  // Build edges
  const edges: GraphEdge[] = [];
  for (const node of allNodes) {
    const m = getModuleById(node.id);
    if (!m) continue;
    for (const feed of m.feedsInto) {
      if (nodeIds.has(feed)) {
        edges.push({ from: m.id, to: feed });
      }
    }
  }

  // Layout: group nodes by layer, arrange in columns
  const layerOrder = ["L1", "L2", "L3", "L4", "L5"];
  const layerGroups = new Map<string, GraphNode[]>();
  for (const node of allNodes) {
    const g = layerGroups.get(node.layer) ?? [];
    g.push(node);
    layerGroups.set(node.layer, g);
  }

  let cx = 40;
  for (const layerId of layerOrder) {
    const group = layerGroups.get(layerId);
    if (!group || group.length === 0) continue;
    const colW = Math.max(...group.map(() => NODE_W)) + NODE_GAP_X;
    const totalH = group.length * NODE_H + (group.length - 1) * NODE_GAP_Y;
    const startY = (400 - totalH) / 2;

    group.forEach((node, i) => {
      node.x = cx;
      node.y = startY + i * (NODE_H + NODE_GAP_Y);
    });

    cx += colW;
  }

  const totalWidth = cx + 40;
  const totalHeight = 440;

  // Zoom/drag handlers
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setTransform((t) => ({
      ...t,
      scale: Math.min(3, Math.max(0.3, t.scale * delta)),
    }));
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
  }, [transform]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      setTransform((t) => ({
        ...t,
        x: dragStart.current.tx + (e.clientX - dragStart.current.x),
        y: dragStart.current.ty + (e.clientY - dragStart.current.y),
      }));
    },
    [dragging]
  );

  const onMouseUp = useCallback(() => setDragging(false), []);

  const resetView = () => setTransform({ x: 0, y: 0, scale: 1 });

  // Node positions lookup
  const nodeMap = new Map(allNodes.map((n) => [n.id, n]));
  const isConnectedToHovered = (nodeId: string): boolean => {
    if (!hoveredNode) return false;
    if (nodeId === hoveredNode) return true;
    return edges.some(
      (e) =>
        (e.from === hoveredNode && e.to === nodeId) ||
        (e.to === hoveredNode && e.from === nodeId)
    );
  };

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="w-full h-[440px] rounded-2xl border border-border-subtle bg-surface-elevated cursor-grab"
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          ["--svg-cursor" as string]: dragging ? "grabbing" : "grab",
        }}
      >
        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>
          {/* Edges */}
          {edges.map((edge) => {
            const from = nodeMap.get(edge.from);
            const to = nodeMap.get(edge.to);
            if (!from || !to) return null;

            const isHighlighted =
              hoveredNode === edge.from || hoveredNode === edge.to;
            const isFaded = hoveredNode && !isHighlighted;

            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={from.x + NODE_W / 2}
                y1={from.y + NODE_H / 2}
                x2={to.x + NODE_W / 2}
                y2={to.y + NODE_H / 2}
                stroke={isHighlighted ? from.color : "#2A2A2A"}
                strokeWidth={isHighlighted ? 2 : 1}
                opacity={isFaded ? 0.15 : 1}
                className="transition-all duration-200"
              />
            );
          })}

          {/* Nodes */}
          {allNodes.map((node) => {
            const isCenter = node.id === moduleId;
            const isHighlighted = hoveredNode
              ? isConnectedToHovered(node.id)
              : true;
            const isFaded = hoveredNode && !isHighlighted;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x},${node.y})`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer transition-opacity duration-200"
                opacity={isFaded ? 0.3 : 1}
              >
                {/* Card background */}
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  fill={isCenter ? node.color + "20" : "#121212"}
                  stroke={
                    isCenter
                      ? node.color + "60"
                      : isHighlighted && hoveredNode
                        ? node.color + "40"
                        : "#1F1F1F"
                  }
                  strokeWidth={isCenter ? 2 : 1}
                  className="transition-all duration-200"
                />

                {/* Layer indicator dot */}
                <circle
                  cx={10}
                  cy={NODE_H / 2}
                  r={4}
                  fill={node.color}
                />

                {/* Label */}
                <text
                  x={22}
                  y={NODE_H / 2 + 1}
                  dominantBaseline="middle"
                  fill="#D4D4D4"
                  fontSize="11"
                  fontFamily="var(--font-body)"
                  textAnchor="start"
                  className="pointer-events-none select-none"
                >
                  {node.name.length > 14
                    ? node.name.slice(0, 14) + "…"
                    : node.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Reset button */}
      <button
        type="button"
        onClick={resetView}
        className="absolute top-3 right-3 rounded-lg border border-border-subtle bg-surface-elevated px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors"
      >
        重置视图
      </button>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 text-[10px] text-text-muted">
        拖拽平移 · 滚轮缩放
      </div>
    </div>
  );
}
