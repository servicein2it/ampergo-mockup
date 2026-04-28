import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { BoltMark } from "../components/Logo";
import { ScreenId } from "../types";

export function F25_Handoff({ go }: { go: (s: ScreenId) => void }) {
  useEffect(() => {
    const t = setTimeout(() => go("F2.1"), 1800);
    return () => clearTimeout(t);
  }, [go]);

  return (
    <div className="flex-1 relative bg-black/60 flex items-center justify-center px-gutter">
      <div className="bg-bg-surface border border-border-subtle rounded-card p-5 w-full max-w-[320px]">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BoltMark size={56} />
          <ArrowRight size={20} className="text-accent-neon" />
          <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "#7C3AED" }}>
            P
          </div>
        </div>
        <div className="text-t2 text-center">Opening EV Station PluZ…</div>
        <div className="text-bodysm text-ink-secondary text-center mt-1">
          Your charging session will start in their app.
        </div>
        <div className="text-cap text-ink-disabled text-center mt-4">
          Referral attributed via AmperGo
        </div>
      </div>
    </div>
  );
}
