export type AISignalCategory =
  | "AI Agents"
  | "AI Tools"
  | "SDLC Change"
  | "Quality Testing"
  | "Security Risk"
  | "Org Leadership";

export type DecisionHorizon = "2026" | "2027-2028" | "2029+";

export interface AISignal {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl?: string;
  detectedAt: string;
  date: string;
  status: "published" | "draft";
  tags?: string[];
  category?: AISignalCategory;
  whyItMatters?: string[];
  recommendedActions?: string[];
  risksAndCaveats?: string[];
  decisionHorizon?: DecisionHorizon;
}

export interface ExpertInsight {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  excerpt: string;
  paragraphs: string[];
  date: string;
  status: "published" | "draft";
  tags?: string[];
}

export interface AISignalIndexEntry {
  id: string;
  file: string;
  date: string;
  status: "published" | "draft";
}

export interface ExpertInsightIndexEntry {
  id: string;
  file: string;
  date: string;
  status: "published" | "draft";
}

export interface ContentIndex<T> {
  lastUpdated: string;
  items: T[];
}

export type DrawerContent =
  | { type: "signal"; data: AISignal }
  | { type: "insight"; data: ExpertInsight };
