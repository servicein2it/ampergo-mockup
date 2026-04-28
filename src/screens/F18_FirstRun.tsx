import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ScreenId } from "../types";

const STEPS = [
  { id: 0, label: "Filter by network, connector, or power.", x: "50%", y: "12%" },
  { id: 1, label: "Search any place in Thailand.", x: "50%", y: "8%" },
  { id: 2, label: "One tap to plan a route.", x: "50%", y: "84%" },
  { id: 3, label: "Map · Routes · Charge · Profile.", x: "50%", y: "96%" },
];

export function F18_FirstRun({ go }: { go: (s: ScreenId) => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < STEPS.length - 1) setStep(step + 1);
      else go("F2.1");
    }, 1500);
    return () => clearTimeout(timer);
  }, [step, go]);

  const cur = STEPS[step];

  return (
    <div
      className="absolute inset-0 z-50 cursor-pointer"
      onClick={() => {
        if (step < STEPS.length - 1) setStep(step + 1);
        else go("F2.1");
      }}
    >
      <div className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm" />
      <AnimatePresence mode="wait">
        <motion.div
          key={cur.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="absolute"
          style={{
            left: cur.x,
            top: cur.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative">
            <div className="absolute -inset-6 rounded-full border-2 border-accent-neon/60 animate-pulse" />
            <div className="bg-bg-elevated border border-accent-neon rounded-card px-4 py-3 text-bodysm shadow-neon max-w-[260px] text-center">
              {cur.label}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        className="absolute left-1/2 -translate-x-1/2 bottom-24 text-bodysm text-ink-primary"
        onClick={(e) => {
          e.stopPropagation();
          go("F2.1");
        }}
      >
        Skip tour
      </button>
    </div>
  );
}
