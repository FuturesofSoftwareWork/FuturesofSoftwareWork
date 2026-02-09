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
