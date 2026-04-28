import { ArrowUpRight, Battery, Volume2, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Pill } from "../components/UI";
import { MapMock, Pin } from "../components/MapMock";
import { ScreenId } from "../types";

export function F35_LiveNav({ go }: { go: (s: ScreenId) => void }) {
  const [actualSoc, setActualSoc] = useState(82);
  const predicted = 85;
  const delta = actualSoc - predicted;

  useEffect(() => {
    const t = setInterval(() => {
      setActualSoc((s) => Math.max(78, s - 0.4));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const tone =
    delta >= 0 ? "neon" : delta <= -10 ? "critical" : delta <= -3 ? "warning" : "neon";
  const status =
    delta >= 0 ? `Ahead of plan · +${Math.round(delta)}%` :
    delta <= -10 ? "Need a stop" :
    delta <= -3 ? `Behind plan · ${Math.round(delta)}%` :
    "On plan";

  const pins: Pin[] = [
    { id: "ahead", x: 60, y: 42, color: "#10B981", kind: "stop", number: 1 },
  ];

  const showRecalc = delta <= -3 && delta > -10;

  return (
    <div className="flex-1 flex flex-col relative">
      <MapMock
        pins={pins}
        showRouteRing={false}
        centeredUser={false}
        showRoute
        routePath={{
          from: { x: 30, y: 80 },
          to: { x: 70, y: 18 },
          via: [
            { x: 45, y: 60 },
            { x: 60, y: 42 },
          ],
        }}
      >
        <div className="absolute z-30 left-2 right-2 top-2">
          <div className="bg-bg-elevated/95 border border-border-subtle rounded-card p-3 backdrop-blur shadow-neonSoft flex items-center gap-3">
            <div className="w-14 h-14 rounded-card bg-accent-neon/15 flex items-center justify-center">
              <ArrowUpRight size={28} className="text-accent-neon" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="font-mono text-display tabular leading-none">800 m</div>
              <div className="text-bodysm text-ink-secondary mt-0.5">turn right onto Phaholyothin Rd</div>
            </div>
            <Pill>110</Pill>
          </div>
        </div>

        <div className="absolute z-30 right-3 bottom-44 flex flex-col gap-3">
          <button className="w-11 h-11 bg-bg-elevated/95 border border-border-subtle rounded-full flex items-center justify-center backdrop-blur">
            <Volume2 size={18} />
          </button>
          <button className="w-11 h-11 bg-bg-elevated/95 border border-border-subtle rounded-full flex items-center justify-center backdrop-blur">
            <Battery size={18} />
          </button>
          <button onClick={() => go("F2.1")} className="w-11 h-11 bg-status-critical/85 rounded-full flex items-center justify-center text-white">
            <X size={20} />
          </button>
        </div>

        {showRecalc && <RecalcSheet onAccept={() => setActualSoc(predicted)} onDismiss={() => setActualSoc(predicted - 2)} />}
      </MapMock>

      {/* Bottom trip status */}
      <div className="absolute z-30 left-2 right-2 bottom-2 bg-bg-elevated/95 border border-border-subtle rounded-card p-3 backdrop-blur">
        <div className="flex items-center justify-between text-bodysm">
          <div>
            <div className="font-mono text-t2 tabular leading-none">17:10</div>
            <div className="text-cap text-ink-secondary mt-0.5">ETA</div>
          </div>
          <div>
            <div className="font-mono text-t2 tabular leading-none">238 km</div>
            <div className="text-cap text-ink-secondary mt-0.5">remaining</div>
          </div>
          <div>
            <div className="font-mono text-t2 tabular leading-none">3</div>
            <div className="text-cap text-ink-secondary mt-0.5">stops</div>
          </div>
          <button onClick={() => go("F3.3")} className="text-cap text-accent-neon font-semibold">
            Plan ↑
          </button>
        </div>
        <div className="mt-3">
          <div className="h-2 rounded-full bg-bg-base relative overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 rounded-full ${
                tone === "warning" ? "bg-status-warning" : tone === "critical" ? "bg-status-critical" : "bg-accent-neon"
              }`}
              style={{ width: `${actualSoc}%`, transition: "all 600ms ease-out" }}
            />
            <div
              className="absolute inset-y-0 w-px bg-white/60"
              style={{ left: `${predicted}%` }}
              title={`Predicted ${predicted}%`}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-cap text-ink-secondary tabular">
            <span className="inline-flex items-center gap-1.5">
              <Zap size={11} className="text-accent-neon" />
              <span className="font-mono">{Math.round(actualSoc)}%</span> actual · {predicted}% predicted
            </span>
            <span className={tone === "warning" ? "text-status-warning" : tone === "critical" ? "text-status-critical" : "text-accent-neon"}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecalcSheet({ onAccept, onDismiss }: { onAccept: () => void; onDismiss: () => void }) {
  return (
    <div className="absolute z-40 inset-x-0 bottom-32 px-3 pointer-events-none">
      <div className="bg-bg-surface border border-status-warning/40 rounded-card p-4 pointer-events-auto shadow-neonSoft">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-status-warning/15 flex items-center justify-center text-status-warning shrink-0">
            <Zap size={20} />
          </div>
          <div className="flex-1">
            <div className="text-t2">Adding a stop</div>
            <p className="text-bodysm text-ink-secondary mt-1">
              Battery is draining faster than planned. We're adding a quick top-up at Chainat (30 km ahead).
            </p>
            <div className="mt-3 bg-bg-elevated rounded-btn p-2 text-cap tabular text-ink-secondary flex items-center justify-between">
              <span>Old: 3 stops · 9h 11m</span>
              <span className="text-accent-neon font-semibold">New: 4 stops · 9h 28m</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={onAccept} className="flex-1 h-10 rounded-btn bg-accent-neon text-bg-base font-semibold text-bodysm">Use new plan</button>
              <button onClick={onDismiss} className="flex-1 h-10 rounded-btn border border-border-subtle text-bodysm">Keep old</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
