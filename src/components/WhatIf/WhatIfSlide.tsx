import React from "react";
import { motion } from "framer-motion";
import { WhatIfSlideData } from "../../data/whatIfSlides";
import { ArrowRight } from "lucide-react";

interface WhatIfSlideProps {
  slide: WhatIfSlideData;
  isActive: boolean;
}

const WhatIfSlide: React.FC<WhatIfSlideProps> = ({ slide, isActive }) => {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-center items-center text-center px-4 ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
      }`}
      aria-hidden={!isActive}
    >
      <motion.div
        initial={false}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Category Tag */}
        <span className="inline-block px-3 py-1 mb-6 text-xs font-mono font-medium tracking-widest uppercase border border-white/20 rounded-full text-gray-400 bg-white/5 backdrop-blur-sm">
          {slide.category}
        </span>

        {/* Question */}
        <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 max-w-4xl mx-auto leading-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
          {slide.question}
        </h3>

        {/* Context */}
        <p className="text-lg md:text-xl text-gray-400 font-light mb-8 max-w-2xl mx-auto font-sans">
          {slide.context}
        </p>

        {/* CTA */}
        {slide.ctaLabel && (
          <a
            href={slide.ctaTarget}
            className="inline-flex items-center gap-2 text-neon-gold hover:text-white transition-colors text-sm font-bold uppercase tracking-wider group"
          >
            {slide.ctaLabel}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        )}
      </motion.div>
    </div>
  );
};

export default WhatIfSlide;
