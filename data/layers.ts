import { Layer } from "@/lib/types";

export const layers: Layer[] = [
  {
    id: "L1",
    name: "传感器层",
    description: "硬件采集设备，将生理信号转换为电信号",
    icon: "📡",
    color: "#FF5757",
  },
  {
    id: "L2",
    name: "基础指标层",
    description: "从单一信号中直接提取的数值型生理指标",
    icon: "📊",
    color: "#FFB347",
  },
  {
    id: "L3",
    name: "融合指标层",
    description: "多信号融合计算得出的复合生理指标",
    icon: "🔄",
    color: "#4ADE80",
  },
  {
    id: "L4",
    name: "高级指标层",
    description: "专利评分系统与复合风险评估指标",
    icon: "⚡",
    color: "#60A5FA",
  },
  {
    id: "L5",
    name: "AI 教练层",
    description: "基于下层指标的系统性解读与个性化训练建议",
    icon: "🧠",
    color: "#C084FC",
  },
];

export function getLayerById(id: string): Layer | undefined {
  return layers.find((l) => l.id === id);
}

export function getAllLayers(): Layer[] {
  return layers;
}
