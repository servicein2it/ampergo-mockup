import { HelpCircle, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Button, Pill } from "../components/UI";
import { ScreenId } from "../types";

const STATES = [
  { key: "Reserved", label: "Reserved — head to address", icon: "📍" },
  { key: "Arrived", label: "Arrived — plug in to start", icon: "🚗" },
  { key: "Charging", label: "Charging", icon: "⚡" },
  { key: "Stopped", label: "Charging stopped — please unplug", icon: "🔌" },
  { key: "Completed", label: "Session complete", icon: "✓" },
];

export function F44_ActiveSession({ go }: { go: (s: ScreenId) => void }) {
  const [stateIdx, setStateIdx] = useState(2);
  const [delivered, setDelivered] = useState(8);
  const target = 22;

  useEffect(() => {
    if (stateIdx !== 2) return;
    const t = setInterval(() => {
      setDelivered((d) => {
        if (d >= target) {
          setStateIdx(3);
          return target;
        }
        return d + 0.5;
      });
    }, 600);
    return () => clearInterval(t);
  }, [stateIdx]);

  const cur = STATES[stateIdx];
  const pct = Math.min(100, (delivered / target) * 100);

  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <AppBar title="P2P Session" onBack={() => go("F4.1")} />
      <div className="flex-1 phone-scroll px-gutter pb-6">
        <div className="bg-bg-surface rounded-card p-5 border border-border-subtle text-center">
          <div className="relative w-40 h-40 mx-auto">
            <svg width="160" height="160" viewBox="0 0 160 160" className="absolute inset-0 -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="#1C2430" strokeWidth="10" fill="none" />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#00E676"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 440} 440`}
                style={{ transition: "stroke-dasharray 600ms ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl">{cur.icon}</div>
              <div className="font-mono text-t1 tabular mt-1">{Math.round(pct)}%</div>
            </div>
          </div>
          <div className="mt-4 text-t2">{cur.label}</div>
          {stateIdx === 2 && (
            <div className="text-bodysm text-ink-secondary mt-1 tabular">
              {delivered.toFixed(1)} of {target} kWh · ETA 12 min
            </div>
          )}
          {stateIdx === 4 && (
            <Pill tone="neon" className="mt-3">218 THB charged</Pill>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Cell label="Energy delivered" value={`${delivered.toFixed(1)} kWh`} />
          <Cell label="Cost so far" value={`${Math.round(delivered * 9)} THB`} />
          <Cell label="Power" value={`${stateIdx === 2 ? "21.8" : "0.0"} kW`} />
          <Cell label="Time elapsed" value={`${Math.floor(delivered * 2.7)}m`} />
        </div>

        <div className="mt-6 space-y-2">
          {stateIdx < 3 && (
            <Button variant="danger" onClick={() => setStateIdx(3)}>Stop charging</Button>
          )}
          {stateIdx === 3 && (
            <Button onClick={() => setStateIdx(4)}>Mark complete</Button>
          )}
          {stateIdx === 4 && (
            <Button onClick={() => go("F4.5")}>Rate your session</Button>
          )}
          <Button variant="secondary">
            <span className="inline-flex items-center gap-2"><MessageCircle size={16} /> Message host</span>
          </Button>
          <button className="w-full text-bodysm text-ink-secondary py-2 inline-flex items-center justify-center gap-2">
            <HelpCircle size={14} /> Get help
          </button>
        </div>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-surface rounded-card p-3 border border-border-subtle">
      <div className="text-cap text-ink-secondary">{label}</div>
      <div className="font-mono text-t2 tabular mt-0.5">{value}</div>
    </div>
  );
}
