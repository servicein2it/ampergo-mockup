import { Check, AlertTriangle, X } from "lucide-react";
import { Button, Pill } from "../components/UI";
import { MapMock, Pin } from "../components/MapMock";
import { TRIP_SUMMARY } from "../data/demo";
import { Lang, ScreenId, RouteOutcome } from "../types";
import { t } from "../i18n";

const STOP_PINS: Pin[] = [
  { id: "s1", x: 38, y: 65, color: "#10B981", kind: "stop", number: 1 },
  { id: "s2", x: 52, y: 45, color: "#7C3AED", kind: "stop", number: 2 },
  { id: "s3", x: 65, y: 28, color: "#10B981", kind: "stop", number: 3 },
];

export function F32_RoutePreview({
  lang,
  go,
  outcome = "GREEN",
}: {
  lang: Lang;
  go: (s: ScreenId) => void;
  outcome?: RouteOutcome;
}) {
  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      {/* Map area */}
      <div className="relative" style={{ height: "55%" }}>
        <MapMock
          centeredUser={false}
          showRouteRing={false}
          showRoute
          routePath={{
            from: { x: 22, y: 82 },
            to: { x: 75, y: 18 },
            via: [
              { x: 38, y: 65 },
              { x: 52, y: 45 },
              { x: 65, y: 28 },
            ],
          }}
          pins={[
            { id: "from", x: 22, y: 82, color: "#00E676", kind: "user" },
            ...STOP_PINS,
            { id: "to", x: 75, y: 18, color: "#FFB300", kind: "cpo" },
          ]}
        >
          <button
            onClick={() => go("F3.1")}
            className="absolute top-3 left-3 z-20 w-10 h-10 bg-bg-elevated/95 border border-border-subtle rounded-full flex items-center justify-center backdrop-blur"
          >
            <X size={20} />
          </button>
          <div className="absolute top-3 right-3 z-20 bg-bg-elevated/95 border border-border-subtle rounded-full px-3 py-1.5 backdrop-blur">
            <div className="text-cap text-ink-secondary">Bangkok → Chiang Mai</div>
          </div>
        </MapMock>
      </div>

      {/* Bottom card */}
      <div className="flex-1 bg-bg-surface border-t border-border-subtle rounded-t-sheet -mt-4 z-10 flex flex-col">
        <OutcomeBanner outcome={outcome} />

        <div className="px-gutter py-4 flex justify-between">
          <Stat value={TRIP_SUMMARY.totalTime} label="Total time" />
          <Stat value={`${TRIP_SUMMARY.distanceKm} km`} label="Distance" />
          <Stat value={TRIP_SUMMARY.stops.toString()} label="Stops" />
        </div>

        <div className="flex-1" />
        <div className="px-gutter pb-6 space-y-2 border-t border-border-subtle pt-3">
          <Button onClick={() => go("F3.5")}>{t("startNav", lang)}</Button>
          <Button variant="secondary" onClick={() => go("F3.3")}>{t("viewTripPlan", lang)}</Button>
          <button className="w-full text-bodysm text-ink-secondary py-2">{t("adjustRoute", lang)}</button>
        </div>
      </div>
    </div>
  );
}

function OutcomeBanner({ outcome }: { outcome: RouteOutcome }) {
  const cfg = {
    GREEN: {
      bg: "bg-accent-neon/15",
      text: "text-accent-neon",
      icon: <Check size={20} />,
      head: "You'll make it",
      sub: "Arrive at Chiang Mai with 35% battery. 3 charging stops planned.",
    },
    YELLOW: {
      bg: "bg-status-warning/15",
      text: "text-status-warning",
      icon: <AlertTriangle size={20} />,
      head: "Tight — one stop suggested",
      sub: "You'll arrive with 12%. We suggest a quick top-up at PluZ Tak for safety.",
    },
    RED: {
      bg: "bg-status-critical/15",
      text: "text-status-critical",
      icon: <X size={20} />,
      head: "Charging required",
      sub: "You can't reach Chiang Mai on a single charge. We've planned 3 stops.",
    },
  }[outcome];

  return (
    <div className={`${cfg.bg} border-y border-border-subtle px-gutter py-3 flex items-start gap-3`}>
      <div className={`w-9 h-9 rounded-full bg-bg-base ${cfg.text} flex items-center justify-center shrink-0`}>
        {cfg.icon}
      </div>
      <div className="flex-1">
        <div className="text-t2 inline-flex items-center gap-2">
          <span className={cfg.text}>{cfg.head}</span>
          <Pill tone={outcome === "GREEN" ? "neon" : outcome === "YELLOW" ? "warning" : "critical"}>{outcome}</Pill>
        </div>
        <div className="text-bodysm text-ink-secondary mt-0.5">{cfg.sub}</div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-display tabular leading-none">{value}</div>
      <div className="text-cap text-ink-secondary mt-1">{label}</div>
    </div>
  );
}
