export interface WhatIfSlideData {
  id: number;
  question: string;
  context: string;
  category: "AI Signal" | "Expert Insights" | "About the Project";
  ctaLabel?: string;
  ctaTarget: string; // anchor ID
}

export const whatIfSlides: WhatIfSlideData[] = [
  {
    id: 1,
    question: "What if AI becomes your most influential teammate—not your fastest tool?",
    context: "Shifting the perspective from automation to collaboration.",
    category: "Expert Insights",
    ctaLabel: "Explore Expert Insights ↓",
    ctaTarget: "#expert-insights",
  },
  {
    id: 2,
    question: "What if the biggest disruptions are visible in signals long before strategy reacts?",
    context: "Detecting weak signals in a noisy technological landscape.",
    category: "AI Signal",
    ctaLabel: "Browse AI Signal ↓",
    ctaTarget: "#ai-signal",
  },
  {
    id: 3,
    question: "What if productivity rises while meaning at work quietly erodes?",
    context: "Balancing efficiency with human purpose and well-being.",
    category: "About the Project",
    ctaLabel: "Read project rationale ↓",
    ctaTarget: "#about-project",
  },
];
