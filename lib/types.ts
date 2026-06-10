export interface GlossaryTerm {
  slug: string;
  term: string;
  termEn: string;
  category: 'physiology' | 'technology' | 'sensor' | 'algorithm' | 'business' | 'medical';
  definition: string;
  detail: string;
  relatedSlugs: string[];
}

export interface Source {
  id: string;
  title: string;
  url: string;
  publisher: string;
  date: string;
  summary: string;
  type: 'academic' | 'news' | 'product' | 'datasheet' | 'report';
}

export interface MarketDataPoint {
  value: string;
  label: string;
  sourceId: string;
  year: string;
}

export interface CompetitorProduct {
  // Core identity
  id?: string;
  name: string;
  manufacturer?: string;
  company?: string;
  // Category & form factor (sweat-analysis)
  category?: "sweat" | "heart-rate" | "respiration" | "temperature" | "multi-parameter";
  formFactor?: "chest-pod" | "forearm-patch" | "body-patch" | "forearm-wearable" | "chest-patch";
  // Pricing
  price: string;
  // Legacy boolean fields (existing entries)
  ecg?: boolean;
  respiration?: boolean;
  temperature?: boolean;
  // Legacy tech & accuracy (existing entries)
  respirationTech?: string;
  temperatureTech?: string;
  accuracy: string;
  // Legacy certification string (existing entries) vs new certifications array
  certification?: string;
  certifications?: string[];
  // Legacy URL
  url?: string;
  website?: string;
  // Sweat-analysis fields
  metrics?: string[];
  technology?: string;
  batteryLife?: string;
  connectivity?: string[];
  ecosystem?: string[];
  strengths?: string[];
  weaknesses?: string[];
  // Shared
  notes: string;
}

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
