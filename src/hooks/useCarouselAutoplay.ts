import { useState, useEffect, useRef, useCallback } from "react";

interface UseCarouselAutoplayProps {
  slideCount: number;
  delay?: number; // ms
}

export const useCarouselAutoplay = ({
  slideCount,
  delay = 9000,
}: UseCarouselAutoplayProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(delay);

  // Handle next slide logic
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slideCount);

    remainingTimeRef.current = delay; // Reset time for next slide
  }, [slideCount, delay]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);

    remainingTimeRef.current = delay;
  }, [slideCount, delay]);

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex(index);

      remainingTimeRef.current = delay;
    },
    [delay]
  );

  // Pause/Resume handlers
  const pause = useCallback(() => {
    setIsPaused(true);
    if (timeoutRef.current && startTimeRef.current) {
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Autoplay Effect
  useEffect(() => {
    if (isPaused) return;

    startTimeRef.current = Date.now();
    timeoutRef.current = window.setTimeout(nextSlide, remainingTimeRef.current);


    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      // cancelAnimationFrame(animationFrameId);
    };
  }, [activeIndex, isPaused, nextSlide, remainingTimeRef]); // Re-run when activeIndex changes or pause state changes

  // Reset remaining time on slide change implies a fresh start handled by nextSlide logic setting ref
  
  // Reduced Motion Check (simplified)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
       setIsPaused(true);
    }
  }, []);

  return {
    activeIndex,
    isPaused,
    nextSlide,
    prevSlide,
    goToSlide,
    pause,
    resume,
  };
};
