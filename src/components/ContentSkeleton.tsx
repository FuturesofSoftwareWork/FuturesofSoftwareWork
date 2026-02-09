import { motion } from "framer-motion";

export const SignalSkeleton = () => (
  <div className="space-y-6">
    {[1, 2, 3].map((item) => (
      <motion.div
        key={item}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: item * 0.05 }}
        className="bg-black/40 border border-hologram-cyan/10 p-6 rounded-none border-l-4 border-l-hologram-cyan/30 backdrop-blur-sm"
      >
        <div className="animate-pulse space-y-3">
          <div className="h-3 w-32 bg-hologram-cyan/10 rounded" />
          <div className="h-5 w-3/4 bg-white/10 rounded" />
          <div className="h-4 w-full bg-white/5 rounded" />
          <div className="h-4 w-2/3 bg-white/5 rounded" />
        </div>
      </motion.div>
    ))}
  </div>
);

export const InsightSkeleton = () => (
  <div className="space-y-12">
    {[1, 2].map((item) => (
      <motion.div
        key={item}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: item * 0.05 }}
        className="bg-white/5 p-8 rounded-xl border border-white/5"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-48 bg-neon-gold/10 rounded" />
          <div className="h-7 w-3/4 bg-white/10 rounded" />
          <div className="h-7 w-1/2 bg-white/10 rounded" />
          <div className="space-y-2 mt-4">
            <div className="h-4 w-full bg-white/5 rounded" />
            <div className="h-4 w-full bg-white/5 rounded" />
            <div className="h-4 w-2/3 bg-white/5 rounded" />
          </div>
          <div className="h-10 w-40 bg-neon-gold/10 rounded-full mt-6" />
        </div>
      </motion.div>
    ))}
  </div>
);
