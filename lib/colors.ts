const LAYER_COLORS: Record<string, string> = {
  L1: "#FF5757",
  L2: "#FFB347",
  L3: "#4ADE80",
  L4: "#60A5FA",
  L5: "#C084FC",
};

export function getLayerHex(layerId: string): string {
  return LAYER_COLORS[layerId] ?? "#A3A3A3";
}

export function getLayerBorderColor(layerId: string): string {
  return (LAYER_COLORS[layerId] ?? "#A3A3A3") + "30";
}

export function getLayerBadgeBg(layerId: string): string {
  return (LAYER_COLORS[layerId] ?? "#A3A3A3") + "15";
}

export function getLayerBg(layerId: string): string {
  return (LAYER_COLORS[layerId] ?? "#A3A3A3") + "10";
}

export function getLayerGlow(layerId: string): string {
  const hex = LAYER_COLORS[layerId] ?? "#A3A3A3";
  return `0 0 40px ${hex}18, 0 0 80px ${hex}08`;
}

export { LAYER_COLORS };
