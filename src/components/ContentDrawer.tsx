import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Sparkles,
  Calendar,
  Tag,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Clock,
  LayoutGrid,
} from "lucide-react";
import type { AISignal, ExpertInsight, DrawerContent } from "@/types/content";

interface ContentDrawerProps {
  content: DrawerContent | null;
  onClose: () => void;
}

const ContentDrawer = ({ content, onClose }: ContentDrawerProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (content) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [content, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (content) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [content]);

  // Auto-focus close button
  useEffect(() => {
    if (content) {
      closeButtonRef.current?.focus();
    }
  }, [content]);

  const isSignal = content?.type === "signal";

  return (
    <AnimatePresence>
      {content && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal="true"
            aria-label={
              isSignal ? "AI Signal details" : "Expert Insight article"
            }
            className={`relative w-full max-w-2xl bg-midnight/95 backdrop-blur-md border-l-4 overflow-y-auto ${
              isSignal ? "border-l-hologram-cyan" : "border-l-neon-gold"
            }`}
          >
            {/* Close button */}
            <div className="sticky top-0 z-10 flex justify-end p-4 bg-midnight/80 backdrop-blur-sm">
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className={`p-2 rounded-full text-gray-400 hover:text-white transition-all focus:outline-none focus:ring-2 ${
                  isSignal
                    ? "hover:bg-hologram-cyan/20 focus:ring-hologram-cyan/50"
                    : "hover:bg-neon-gold/20 focus:ring-neon-gold/50"
                }`}
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 pb-12">
              {content.type === "signal" ? (
                <SignalContent data={content.data} />
              ) : (
                <InsightContent data={content.data} />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SignalContent = ({ data }: { data: AISignal }) => {
  const formattedDate = new Date(data.detectedAt).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(data.detectedAt).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <>
      {/* Top metadata row: source + category + decision horizon */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-hologram-cyan font-mono uppercase tracking-wider">
          <Sparkles size={14} />
          {data.source}
        </div>
        {data.category && (
          <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-full border border-hologram-cyan/30 text-hologram-cyan bg-hologram-cyan/10">
            <LayoutGrid size={12} />
            {data.category}
          </span>
        )}
        {data.decisionHorizon && (
          <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-full border border-electric-blue/30 text-electric-blue bg-electric-blue/10">
            <Clock size={12} />
            {data.decisionHorizon}
          </span>
        )}
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 mb-6 text-gray-500 text-sm">
        <Calendar size={14} />
        {formattedDate} at {formattedTime}
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
        {data.title}
      </h2>

      {/* Summary */}
      <div className="prose prose-invert prose-lg max-w-none">
        <p className="text-gray-300 leading-relaxed">{data.summary}</p>
      </div>

      {/* Why It Matters */}
      {data.whyItMatters && data.whyItMatters.length > 0 && (
        <div className="mt-10">
          <h3 className="flex items-center gap-2 text-sm font-bold text-hologram-cyan uppercase tracking-widest mb-4">
            <Lightbulb size={16} />
            Why It Matters
          </h3>
          <ul className="space-y-3">
            {data.whyItMatters.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-gray-300 text-sm leading-relaxed"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-hologram-cyan shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Actions */}
      {data.recommendedActions && data.recommendedActions.length > 0 && (
        <div className="mt-8">
          <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">
            <CheckCircle size={16} />
            Recommended Actions
          </h3>
          <ul className="space-y-3">
            {data.recommendedActions.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-gray-300 text-sm leading-relaxed"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Risks & Caveats */}
      {data.risksAndCaveats && data.risksAndCaveats.length > 0 && (
        <div className="mt-8">
          <h3 className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">
            <AlertTriangle size={16} />
            Risks & Caveats
          </h3>
          <ul className="space-y-3">
            {data.risksAndCaveats.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-gray-300 text-sm leading-relaxed"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {data.tags && data.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          <Tag size={14} className="text-hologram-cyan mt-1" />
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono rounded-full border border-hologram-cyan/30 text-hologram-cyan bg-hologram-cyan/5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Source link */}
      {data.sourceUrl && (
        <a
          href={data.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-hologram-cyan hover:text-white border border-hologram-cyan/50 px-6 py-3 rounded-full hover:bg-hologram-cyan/20 transition-all text-sm font-bold uppercase tracking-widest"
        >
          View Source <ExternalLink size={14} />
        </a>
      )}
    </>
  );
};

const InsightContent = ({ data }: { data: ExpertInsight }) => {
  const formattedDate = new Date(data.date).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Author byline */}
      <div className="flex items-center gap-2 mb-6 text-neon-gold font-serif italic text-lg">
        By {data.author} &bull; {data.authorRole}
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 mb-6 text-gray-500 text-sm">
        <Calendar size={14} />
        {formattedDate}
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-10 leading-tight">
        {data.title}
      </h2>

      {/* Full article body */}
      <div className="prose prose-invert prose-lg max-w-none font-serif">
        {data.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-300 leading-loose mb-6">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Tags */}
      {data.tags && data.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          <Tag size={14} className="text-neon-gold mt-1" />
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono rounded-full border border-neon-gold/30 text-neon-gold bg-neon-gold/5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* External Link */}
      {data.url && (
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-neon-gold hover:text-white border border-neon-gold/50 px-6 py-3 rounded-full hover:bg-neon-gold/20 transition-all text-sm font-bold uppercase tracking-widest"
        >
          Read Full Article <ExternalLink size={14} />
        </a>
      )}
    </>
  );
};

export default ContentDrawer;
