import type { AISignal, ExpertInsight } from "@/types/content";

export const defaultAISignals: AISignal[] = [
  {
    id: "default-1",
    title: "Generative AI models surpass junior developer benchmarks in 2025",
    summary:
      "Recent studies indicate a massive shift in entry-level coding tasks being automated. Efficiency gains are offset by integration challenges...",
    source: "Auto-Detected",
    detectedAt: "2026-02-06T00:42:15Z",
    date: "2026-02-06",
    status: "published",
  },
  {
    id: "default-2",
    title:
      "Enterprise adoption of AI pair programming reaches 60% in Nordic tech firms",
    summary:
      "A comprehensive survey of Nordic software companies reveals rapid adoption of AI-assisted development tools, with significant implications for team structures.",
    source: "Auto-Detected",
    detectedAt: "2026-02-06T08:15:30Z",
    date: "2026-02-06",
    status: "published",
  },
  {
    id: "default-3",
    title: "Open-source LLMs close performance gap with proprietary models",
    summary:
      "Latest benchmarks show open-source large language models achieving 95% parity with leading commercial alternatives.",
    source: "Auto-Detected",
    detectedAt: "2026-02-05T14:22:00Z",
    date: "2026-02-05",
    status: "published",
  },
];

export const defaultExpertInsights: ExpertInsight[] = [
  {
    id: "default-empathy",
    title: "The Socio-Technical Shift: Why Empathy Matters More Than Code",
    author: "Dr. Sarah Jenkins",
    authorRole: "Research Lead",
    excerpt:
      "As algorithms take over the syntax of software, the semantics become the exclusive domain of human engineers.",
    paragraphs: [
      "As algorithms take over the syntax of software, the semantics\u2014the meaning and purpose\u2014become the exclusive domain of human engineers. We must pivot our education systems similarly to how architecture evolved...",
    ],
    date: "2026-02-04",
    status: "published",
  },
  {
    id: "default-code-review",
    title: "Code Review in the Age of AI: From Gatekeeping to Mentorship",
    author: "Prof. Mikko Lahtinen",
    authorRole: "University of Helsinki",
    excerpt:
      "When AI generates most of the code, the role of code review transforms from error detection to knowledge transfer.",
    paragraphs: [
      "When AI generates most of the code, the role of code review transforms from error detection to knowledge transfer and architectural stewardship.",
    ],
    date: "2026-01-28",
    status: "published",
  },
];
