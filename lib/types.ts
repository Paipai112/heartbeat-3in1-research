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
  name: string;
  manufacturer: string;
  price: string;
  ecg: boolean;
  respiration: boolean;
  temperature: boolean;
  respirationTech: string;
  temperatureTech: string;
  accuracy: string;
  certification: string;
  url: string;
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
