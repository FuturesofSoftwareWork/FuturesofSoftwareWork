import React from "react";
import WhatIfCarousel from "./WhatIfCarousel";
import { whatIfSlides } from "../../data/whatIfSlides";

const WhatIfSection = () => {
  return (
    <section className="relative bg-midnight overflow-hidden py-12 border-b border-white/5">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-gray-900 to-midnight opacity-50 z-0" />

      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Label */}
        <div className="text-center mb-8">
          <span className="text-neon-gold font-mono text-xs uppercase tracking-[0.3em] font-bold opacity-80">
            Strategic Provocations
          </span>
        </div>

        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <WhatIfCarousel slides={whatIfSlides} />
        </div>
      </div>
    </section>
  );
};

export default WhatIfSection;
