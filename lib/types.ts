// ════════════════════════════════════════════════════════════
// HeartBeat Knowledge Base — Core Data Types
// Per FRAMEWORK-SPEC 4.1
// ════════════════════════════════════════════════════════════

// === Layer (层级/分类) ===
export interface Layer {
  id: string;          // "L1", "L2", "L3", "L4", "L5"
  name: string;        // Display name (Chinese)
  description: string;
  icon: string;        // Single emoji
  color: string;       // Hex color: "#FF5757"
}

// === Module (知识模块 — core entity) ===
export interface Module {
  id: string;          // "L1:slug" — colon-separated, layer prefix + English slug
  layer: string;       // Layer ID: "L1"
  name: string;
  summary: string;     // ≤200 chars one-liner
  description: string; // Full description with [ref-xxx] markers and \n\n paragraph separators
  importance: "high" | "medium" | "low";
  dependsOn: string[]; // Module IDs this module depends on
  feedsInto: string[]; // Module IDs this module outputs to
  tags: string[];      // Chinese category tags
  implementations: Implementation[];
  glossaryTerms: string[];  // Glossary term IDs
  references: string[];     // Reference IDs (ref-xxx format)
  principles?: string;      // Optional deep-dive principles section
}

// === Implementation (实现方案) ===
export interface Implementation {
  type: "mainstream" | "advanced";
  name: string;
  vendor: string;
  description: string;
  pros: string[];
  cons: string[];
  citations: string[]; // Reference IDs
}

// === Reference (参考文献) ===
export interface Reference {
  id: string;          // "ref-authorYear" or "ref-descriptive-slug"
  title: string;
  authors?: string;
  url?: string;
  doi?: string;
  year?: number;
  type: "paper" | "website" | "patent" | "documentation" | "book";
  zhSummary?: string;  // Chinese summary
}

// === Glossary Term (术语表) ===
export interface GlossaryTerm {
  id: string;          // Lowercase English slug
  term: string;        // Display name (supports "/" for synonyms: "ECG/EKG")
  category: string;    // Chinese category name
  definition: string;  // Short definition
  detail?: string;     // Full detailed explanation (optional, for term detail page)
  references: string[]; // Reference IDs
}

// ════════════════════════════════════════════════════════════
// Legacy types — @deprecated, kept for backward compatibility
// during migration. Will be removed after content migration complete.
// ════════════════════════════════════════════════════════════

/** @deprecated Use Reference (new format) instead */
export interface Source {
  id: string;
  title: string;
  url: string;
  publisher: string;
  date: string;
  summary: string;
  type: 'academic' | 'news' | 'product' | 'datasheet' | 'report';
}

/** @deprecated Content migrated to Module data files */
export interface MarketDataPoint {
  value: string;
  label: string;
  sourceId: string;
  year: string;
}

/** @deprecated Content migrated to Module data files */
export interface CompetitorProduct {
  id?: string;
  name: string;
  manufacturer?: string;
  company?: string;
  category?: "sweat" | "heart-rate" | "respiration" | "temperature" | "multi-parameter";
  formFactor?: "chest-pod" | "forearm-patch" | "body-patch" | "forearm-wearable" | "chest-patch";
  price: string;
  ecg?: boolean;
  respiration?: boolean;
  temperature?: boolean;
  respirationTech?: string;
  temperatureTech?: string;
  accuracy: string;
  certification?: string;
  certifications?: string[];
  url?: string;
  website?: string;
  metrics?: string[];
  technology?: string;
  batteryLife?: string;
  connectivity?: string[];
  ecosystem?: string[];
  strengths?: string[];
  weaknesses?: string[];
  notes: string;
}

/** @deprecated Content migrated to Module implementations */
export interface TechnologyMethod {
  name: string;
  nameEn: string;
  principle: string;
  accuracyStatic: string;
  accuracyDynamic: string;
  tidalVolumeCapable: boolean;
  powerConsumption: string;
  motionRobustness: string;
  chestStrapFit: string;
  maturity: 'commercial' | 'clinical' | 'research' | 'concept';
  products: string;
}

/** @deprecated Content migrated to Module implementations */
export interface ChipSolution {
  name: string;
  ecgChip: string;
  bioZChip: string;
  tempChip: string;
  bomCost: string;
  powerEstimate: string;
  ecgBits: string;
  bioZBits: string;
  tempAccuracy: string;
  recommendation: number;
  notes: string;
}

/** @deprecated Content migrated to Module data files */
export interface PhysiologyMetric {
  name: string;
  nameEn: string;
  sensor: 'ecg' | 'respiration' | 'temperature' | 'fusion';
  description: string;
  unit: string;
  typicalRange: string;
  trainingApplication: string;
  aiCoachRelevance: 'high' | 'medium' | 'low';
}

/** @deprecated Use GlossaryTerm (new format) instead */
export interface OldGlossaryTerm {
  slug: string;
  term: string;
  termEn: string;
  category: 'physiology' | 'technology' | 'sensor' | 'algorithm' | 'business' | 'medical';
  definition: string;
  detail: string;
  relatedSlugs: string[];
}
