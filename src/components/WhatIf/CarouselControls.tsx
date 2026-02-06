import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselControlsProps {
  totalSlides: number;
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  isPaused: boolean;

  duration: number; // Duration of one slide in ms
}

const CarouselControls: React.FC<CarouselControlsProps> = ({
  totalSlides,
  activeIndex,
  onNext,
  onPrev,
  onGoTo,
  isPaused,

  duration,
}) => {
  return (
    <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-4">
      {/* Progress Bar Container */}
      <div className="flex items-center gap-2 w-full max-w-md px-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoTo(index)}
            className="group relative flex-1 h-1 bg-white/10 rounded-full overflow-hidden transition-all hover:bg-white/20 focus:outline-none focus:ring-1 focus:ring-neon-gold/50"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : "false"}
          >
            {/* Active Progress Fill */}
            <div
              className={`absolute top-0 left-0 h-full bg-neon-gold transition-all ease-linear ${
                index < activeIndex
                  ? "w-full duration-0"
                  : index === activeIndex
                    ? "w-full"
                    : "w-0 duration-0"
              }`}
              style={{
                transitionDuration:
                  index === activeIndex ? `${duration}ms` : "0ms",
                // If paused, we freeze the width? Complex with pure CSS.
                // Simplified approach: If active, it animates to full.
                // If paused, ideally we pause the animation.
                // For this V1, we accept that CSS transitions reset on component re-render if we mess with state too much.
                // We'll stick to 'filled if passed' for simplicity, or simple full highlight for active.
                // Better simple UX: just highlight active segment.
                width:
                  index === activeIndex
                    ? "100%"
                    : index < activeIndex
                      ? "100%"
                      : "0%",
                // Reset transition when it's NOT the active index to instant swap
                transitionProperty: "width",
              }}
            />
            {/* Simple Active Highlight Override for cleanliness if animation is tricky */}
            {index === activeIndex && isPaused && (
              <div className="absolute top-0 left-0 h-full w-full bg-neon-gold/50" />
            )}
          </button>
        ))}
      </div>

      {/* Manual Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={onPrev}
          className="p-2 text-gray-400 hover:text-white transition-colors focus:outline-none focus:text-neon-gold"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <span className="text-xs font-mono text-gray-500 tracking-widest">
          {activeIndex + 1} / {totalSlides}
        </span>

        <button
          onClick={onNext}
          className="p-2 text-gray-400 hover:text-white transition-colors focus:outline-none focus:text-neon-gold"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Pause/Play Toggle (Optional but good for a11y) */}
        {/* <button
          onClick={onTogglePause}
          className="p-2 text-gray-500 hover:text-white transition-colors"
          aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
        >
          {isPaused ? <Play size={14} /> : <Pause size={14} />}
        </button> */}
      </div>
    </div>
  );
};

export default CarouselControls;
