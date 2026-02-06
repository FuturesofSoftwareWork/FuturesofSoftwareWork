import React from "react";
import { useCarouselAutoplay } from "../../hooks/useCarouselAutoplay";
import WhatIfSlide from "./WhatIfSlide";
import CarouselControls from "./CarouselControls";
import { WhatIfSlideData } from "../../data/whatIfSlides";

interface WhatIfCarouselProps {
  slides: WhatIfSlideData[];
}

const WhatIfCarousel: React.FC<WhatIfCarouselProps> = ({ slides }) => {
  const SLIDE_DURATION = 9000;

  const {
    activeIndex,
    isPaused,
    nextSlide,
    prevSlide,
    goToSlide,
    pause,
    resume,
  } = useCarouselAutoplay({
    slideCount: slides.length,
    delay: SLIDE_DURATION,
  });

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] flex flex-col justify-center overflow-hidden group"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      role="region"
      aria-roledescription="carousel"
      aria-label="What If Scenarios"
    >
      {/* Slides Container */}
      <div className="relative w-full h-full flex-1">
        {slides.map((slide, index) => (
          <WhatIfSlide
            key={slide.id}
            slide={slide}
            isActive={index === activeIndex}
          />
        ))}
      </div>

      {/* Controls - Positioned absolute bottom */}
      <CarouselControls
        totalSlides={slides.length}
        activeIndex={activeIndex}
        onNext={nextSlide}
        onPrev={prevSlide}
        onGoTo={goToSlide}
        isPaused={isPaused}
        duration={SLIDE_DURATION}
      />
    </div>
  );
};

export default WhatIfCarousel;
