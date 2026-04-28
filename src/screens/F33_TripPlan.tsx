import { ChevronRight, Share2, Zap } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { Button, SegBar } from "../components/UI";
import { TRIP_SEGMENTS, TRIP_SUMMARY } from "../data/demo";
import { Lang, ScreenId } from "../types";
import { t } from "../i18n";

export function F33_TripPlan({
  lang,
  go,
}: {
  lang: Lang;
  go: (s: ScreenId) => void;
}) {
  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <AppBar
        title="Trip Plan"
        onBack={() => go("F3.2")}
        right={
          <button className="w-10 h-10 flex items-center justify-center">
            <Share2 size={18} />
          </button>
        }
      />

      <div className="px-gutter py-3 border-b border-border-subtle bg-bg-base/95 backdrop-blur sticky top-0 z-10">
        <div className="grid grid-cols-3 gap-3">
          <SummaryStat value={TRIP_SUMMARY.totalTime} label="Total time" />
          <SummaryStat value={`${TRIP_SUMMARY.distanceKm} km`} label="Distance" />
          <SummaryStat value={`${TRIP_SUMMARY.stops}`} label="Stops" />
        </div>
      </div>

      <div className="flex-1 phone-scroll px-gutter py-4 pb-20">
        {TRIP_SEGMENTS.map((seg, i) => (
          <div key={i} className="relative pl-8">
            {i < TRIP_SEGMENTS.length - 1 && (
              <div className="absolute left-3 top-7 bottom-0 w-px bg-border-subtle" />
            )}
            {seg.kind === "drive" ? (
              <div className="mb-3">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-bg-elevated border border-border-subtle text-cap font-bold tabular text-ink-secondary flex items-center justify-center">
                  {Math.ceil((i + 1) / 2)}
                </div>
                <div className="bg-bg-surface border border-border-subtle rounded-card p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-t2 text-body">
                      {seg.from} → {seg.to}
                    </div>
                    <div className="font-mono text-bodysm tabular text-ink-secondary">
                      {seg.distanceKm} km
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-3 text-center">
                    <Stat label="Elev" value={seg.elev} />
                    <Stat label="Wh/km" value={seg.whPerKm.toString()} />
                    <Stat label="Energy" value={`${seg.energyKwh.toFixed(1)} kWh`} />
                    <Stat label="Time" value={`${Math.floor(seg.timeMin / 60)}h ${seg.timeMin % 60}m`} />
                  </div>
                  <div className="mt-3">
                    <SegBar start={seg.socStart} end={seg.socEnd} />
                    <div className="flex justify-between mt-1.5 text-cap text-ink-secondary tabular">
                      <span>Start {seg.socStart}%</span>
                      <span>End {seg.socEnd}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => go("F3.4")}
                className="block w-full text-left mb-3"
              >
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-accent-neon/20 border border-accent-neon flex items-center justify-center">
                  <Zap size={12} className="text-accent-neon" />
                </div>
                <div className="bg-bg-surface border border-accent-neon/30 rounded-card p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-t2 text-body">Charge at {seg.station}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: seg.networkColor }}
                        />
                        <div className="text-cap text-ink-secondary">
                          {seg.network} · DC {seg.powerKw} kW
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-ink-secondary" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                    <Stat label="Energy" value={`+${seg.addedKwh.toFixed(1)} kWh`} />
                    <Stat label="Time" value={`${seg.timeMin} min`} />
                    <Stat label="Cost" value={`${seg.costThb} ฿`} />
                  </div>
                  <div className="mt-3">
                    <SegBar start={seg.socStart} end={seg.socEnd} />
                    <div className="flex justify-between mt-1.5 text-cap text-ink-secondary tabular">
                      <span>Start {seg.socStart}%</span>
                      <span>End {seg.socEnd}%</span>
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="px-gutter pb-6 pt-3 border-t border-border-subtle space-y-2 bg-bg-base">
        <Button onClick={() => go("F3.5")}>{t("startNav", lang)}</Button>
        <Button variant="secondary">Edit plan</Button>
      </div>
    </div>
  );
}

function SummaryStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-mono text-t2 tabular leading-none">{value}</div>
      <div className="text-cap text-ink-secondary mt-1">{label}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-cap text-ink-secondary">{label}</div>
      <div className="font-mono text-bodysm tabular mt-0.5">{value}</div>
    </div>
  );
}
