import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Newspaper, Sparkles } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { SignalSkeleton, InsightSkeleton } from "@/components/ContentSkeleton";
import ContentDrawer from "@/components/ContentDrawer";
import type { AISignalCategory, DrawerContent } from "@/types/content";

const formatDetectedDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const ContentStream = () => {
  const { signals, insights, isLoading } = useContent({
    maxSignals: 5,
    maxInsights: 3,
  });

  const [drawerContent, setDrawerContent] = useState<DrawerContent | null>(
    null,
  );
  const closeDrawer = useCallback(() => setDrawerContent(null), []);

  const [activeCategory, setActiveCategory] =
    useState<AISignalCategory | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(
      signals
        .map((s) => s.category)
        .filter((c): c is AISignalCategory => c != null),
    );
    return [...cats].sort();
  }, [signals]);

  const filteredSignals = activeCategory
    ? signals.filter((s) => s.category === activeCategory)
    : signals;

  return (
    <section className="bg-midnight min-h-screen py-20 px-4 relative">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-electric-blue/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        {/* AI News Column */}
        <div className="relative" id="ai-signal">
          <div className="sticky top-24">
            <div className="flex items-center gap-3 mb-8 border-b border-hologram-cyan/30 pb-4">
              <Bot className="w-8 h-8 text-hologram-cyan" />
              <h2 className="text-3xl font-sans font-bold text-white tracking-wide">
                AI <span className="text-hologram-cyan">Signal</span>
              </h2>
            </div>

            {/* Category filter pills */}
            {!isLoading && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-full border transition-all ${
                    activeCategory === null
                      ? "bg-hologram-cyan/20 text-hologram-cyan border-hologram-cyan"
                      : "bg-white/5 text-gray-400 border-white/10 hover:border-hologram-cyan/30"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-full border transition-all ${
                      activeCategory === cat
                        ? "bg-hologram-cyan/20 text-hologram-cyan border-hologram-cyan"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-hologram-cyan/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {isLoading ? (
              <SignalSkeleton />
            ) : filteredSignals.length === 0 ? (
              <p className="text-gray-500 text-sm italic py-8">
                No signals in this category.
              </p>
            ) : (
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                {filteredSignals.map((signal, index) => (
                  <motion.div
                    key={signal.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() =>
                      setDrawerContent({ type: "signal", data: signal })
                    }
                    className="bg-black/40 border border-hologram-cyan/20 p-6 rounded-none border-l-4 border-l-hologram-cyan hover:bg-hologram-cyan/5 transition-[background-color] group cursor-pointer backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 mb-3 text-xs text-hologram-cyan font-mono uppercase tracking-wider">
                      <Sparkles size={12} />
                      {signal.source} &bull;{" "}
                      {formatDetectedDate(signal.detectedAt)}
                    </div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-hologram-cyan transition-colors">
                      {signal.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {signal.summary}
                    </p>
                  </motion.div>
                ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Human Articles Column */}
        <div className="relative mt-12 md:mt-0" id="expert-insights">
          <div className="flex items-center gap-3 mb-8 border-b border-neon-gold/30 pb-4 justify-end md:justify-start">
            <User className="w-8 h-8 text-neon-gold" />
            <h2 className="text-3xl font-serif font-bold text-white">
              Expert <span className="text-neon-gold">Insights</span>
            </h2>
          </div>

          {isLoading ? (
            <InsightSkeleton />
          ) : (
            <div className="space-y-12">
              {insights.map((insight) => (
                <motion.article
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 p-8 rounded-xl border border-white/5 hover:border-neon-gold/30 transition-all hover:bg-white/10"
                >
                  <div className="flex items-center gap-2 mb-4 text-neon-gold font-serif italic">
                    By {insight.author} &bull; {insight.authorRole}
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-4 leading-tight">
                    {insight.title}
                  </h3>
                  <div className="prose prose-invert max-w-none text-gray-300 font-serif leading-loose">
                    {insight.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setDrawerContent({ type: "insight", data: insight })
                    }
                    className="mt-8 text-neon-gold hover:text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 border border-neon-gold/50 px-6 py-3 rounded-full hover:bg-neon-gold/20 transition-all"
                  >
                    Read Full Article <Newspaper size={16} />
                  </button>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>

      <ContentDrawer content={drawerContent} onClose={closeDrawer} />
    </section>
  );
};

export default ContentStream;
