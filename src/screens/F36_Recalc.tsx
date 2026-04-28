import { Zap } from "lucide-react";
import { Button } from "../components/UI";
import { ScreenId } from "../types";

export function F36_Recalc({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex-1 relative bg-black/40">
      <div className="absolute inset-0" onClick={() => go("F3.5")} />
      <div className="absolute inset-x-0 bottom-0 bg-bg-surface rounded-t-sheet border-t border-border-subtle p-gutter pb-6" style={{ height: "55%" }}>
        <div className="flex justify-center pb-3">
          <div className="w-9 h-1 rounded-full bg-ink-disabled" />
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-accent-neon/15 flex items-center justify-center text-accent-neon">
            <Zap size={28} />
          </div>
          <div className="text-t1 mt-3">Adding a stop</div>
          <p className="text-bodysm text-ink-secondary mt-2 px-4">
            Battery is draining faster than planned. We're adding a quick top-up at Chainat (30 km ahead).
          </p>
        </div>
        <div className="mt-5 bg-bg-elevated rounded-card p-4 border border-border-subtle">
          <div className="flex items-center justify-between text-bodysm tabular">
            <span className="text-ink-secondary">Old plan: 3 stops · 9h 11m</span>
            <span className="text-accent-neon font-semibold">New plan: 4 stops · 9h 28m</span>
          </div>
        </div>
        <div className="mt-5 space-y-2">
          <Button onClick={() => go("F3.5")}>Use new plan</Button>
          <Button variant="secondary" onClick={() => go("F3.5")}>Keep old plan</Button>
          <button className="w-full text-bodysm text-ink-secondary py-2">Why?</button>
        </div>
      </div>
    </div>
  );
}
