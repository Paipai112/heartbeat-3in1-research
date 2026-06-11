import { Module, GlossaryTerm, Reference, Layer } from "@/lib/types";

// Module data is loaded lazily to avoid circular imports
let _modulesCache: Module[] | null = null;

async function loadAllModules(): Promise<Module[]> {
  if (_modulesCache) return _modulesCache;
  const [l1, l2, l3, l4, l5] = await Promise.all([
    import("@/data/modules-l1"),
    import("@/data/modules-l2"),
    import("@/data/modules-l3"),
    import("@/data/modules-l4"),
    import("@/data/modules-l5"),
  ]);
  _modulesCache = [
    ...l1.l1Modules,
    ...l2.l2Modules,
    ...l3.l3Modules,
    ...l4.l4Modules,
    ...l5.l5Modules,
  ];
  return _modulesCache;
}

// Synchronous fallback for server components (Next.js SSG resolves imports at build time)
import { l1Modules } from "@/data/modules-l1";
import { l2Modules } from "@/data/modules-l2";
import { l3Modules } from "@/data/modules-l3";
import { l4Modules } from "@/data/modules-l4";
import { l5Modules } from "@/data/modules-l5";

const allModules: Module[] = [
  ...l1Modules,
  ...l2Modules,
  ...l3Modules,
  ...l4Modules,
  ...l5Modules,
];

export function getModuleById(id: string): Module | undefined {
  return allModules.find((m) => m.id === id);
}

export function getModulesByIds(ids: string[]): Module[] {
  return ids
    .map((id) => allModules.find((m) => m.id === id))
    .filter((m): m is Module => m !== undefined);
}

export function getModulesByLayer(layerId: string): Module[] {
  return allModules.filter((m) => m.layer === layerId);
}

export function getModulesByTag(tag: string): Module[] {
  return allModules.filter((m) => m.tags.includes(tag));
}

export function getAllModules(): Module[] {
  return allModules;
}

export function getModuleCount(layerId: string): number {
  return allModules.filter((m) => m.layer === layerId).length;
}

// --- Glossary access ---
import { glossaryTerms } from "@/data/glossary";

export function getGlossaryTermById(id: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.id === id);
}

export function getGlossaryTermsByCategory(category: string): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.category === category);
}

export function getAllGlossaryTerms(): GlossaryTerm[] {
  return glossaryTerms;
}

export function getAllGlossaryCategories(): string[] {
  const cats = new Set(glossaryTerms.map((t) => t.category));
  return Array.from(cats);
}

// --- Reference access ---
import { references } from "@/data/references";

export function getReferenceById(id: string): Reference | undefined {
  return references.find((r) => r.id === id);
}

export function getReferencesByIds(ids: string[]): Reference[] {
  return ids
    .map((id) => references.find((r) => r.id === id))
    .filter((r): r is Reference => r !== undefined);
}

export function getReferencesByType(type: string): Reference[] {
  return references.filter((r) => r.type === type);
}

export function getAllReferences(): Reference[] {
  return references;
}

// --- Layer access (re-exported for convenience) ---
export { getLayerById, getAllLayers } from "@/data/layers";
