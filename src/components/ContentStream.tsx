import { motion } from "framer-motion";
import { Bot, User, Newspaper, Sparkles } from "lucide-react";

const ContentStream = () => {
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

            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item * 0.1 }}
                  className="bg-black/40 border border-hologram-cyan/20 p-6 rounded-none border-l-4 border-l-hologram-cyan hover:bg-hologram-cyan/5 transition-all group cursor-pointer backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-3 text-xs text-hologram-cyan font-mono uppercase tracking-wider">
                    <Sparkles size={12} />
                    Auto-Detected • 00:42:15
                  </div>
                  <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-hologram-cyan transition-colors">
                    Generative AI models surpass junior developer benchmarks in
                    2025
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Recent studies indicate a massive shift in entry-level
                    coding tasks being automated. Efficiency gains are offset by
                    integration challenges...
                  </p>
                </motion.div>
              ))}
            </div>
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

          <div className="space-y-12">
            {[1, 2].map((item) => (
              <motion.article
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 p-8 rounded-xl border border-white/5 hover:border-neon-gold/30 transition-all hover:bg-white/10"
              >
                <div className="flex items-center gap-2 mb-4 text-neon-gold font-serif italic">
                  By Dr. Sarah Jenkins • Research Lead
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-4 leading-tight">
                  The Socio-Technical Shift: Why Empathy Matters More Than Code
                </h3>
                <div className="prose prose-invert max-w-none text-gray-300 font-serif leading-loose">
                  <p>
                    As algorithms take over the syntax of software, the
                    semantics—the meaning and purpose—become the exclusive
                    domain of human engineers. We must pivot our education
                    systems similarly to how architecture evolved...
                  </p>
                </div>
                <button className="mt-8 text-neon-gold hover:text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 border border-neon-gold/50 px-6 py-3 rounded-full hover:bg-neon-gold/20 transition-all">
                  Read Full Article <Newspaper size={16} />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentStream;
