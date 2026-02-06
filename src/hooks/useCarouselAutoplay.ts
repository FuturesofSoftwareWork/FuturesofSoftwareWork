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
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(delay);

  // Handle next slide logic
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
    setProgress(0);
    remainingTimeRef.current = delay; // Reset time for next slide
  }, [slideCount, delay]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
    setProgress(0);
    remainingTimeRef.current = delay;
  }, [slideCount, delay]);

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setProgress(0);
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

    // Progress bar animation loop (approximate)
    let animationFrameId: number;
    const animateProgress = () => {
      if (isPaused || !startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      // Calculate total progress based on (delay - remaining) + elapsed
      // Simplification: just map elapsed against current remaining chunk
      // This is a bit tricky with pause/resume math, so simplest visual approach:
      // use CSS transition for smooth bar, but here we just manage the trigger.
      // Actually, for a smooth progress bar, CSS with a keyframe or transition is better implies strictly controlled state.
      // Let's rely on the timeout for the actual switch and use a CSS keyframe in the component driven by a 'key' prop potentially,
      // OR just simple interval for React state progress if we want semantic progress.
      // Given requirements: "segmented bar that fills".
      // Let's leave strict progress state calculation to the component or CSS to save perf,
      // but we return isPaused so component can pause the CSS animation.
    };
    // animationFrameId = requestAnimationFrame(animateProgress);

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
