import { Coffee, Copy, Navigation, Star, Wifi, Zap } from "lucide-react";
import { useState } from "react";
import { Button, LiveDot, Pill } from "../components/UI";
import { STATIONS_DEMO } from "../data/demo";
import { ScreenId } from "../types";

const station = STATIONS_DEMO[0];

export function F24_StationDetail({ go }: { go: (s: ScreenId) => void }) {
  const [snap, setSnap] = useState<"peek" | "default" | "full">("default");

  return (
    <div className="flex-1 relative bg-black/30">
      <div className="absolute inset-0" onClick={() => go("F2.1")} />
      <div
        className="absolute inset-x-0 bottom-0 bg-bg-surface rounded-t-sheet border-t border-border-subtle flex flex-col transition-all"
        style={{ height: snap === "peek" ? "35%" : snap === "default" ? "62%" : "92%" }}
      >
        <button
          className="pt-2 pb-1 flex justify-center"
          onClick={() => setSnap(snap === "peek" ? "default" : snap === "default" ? "full" : "peek")}
        >
          <div className="w-9 h-1 rounded-full bg-ink-disabled" />
        </button>

        <div className="flex-1 phone-scroll px-gutter pb-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: station.networkColor }} />
            <div className="text-t2 flex-1 truncate">{station.name}</div>
            <Pill>{station.distanceKm} km</Pill>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {station.connectors.map((c) => (
              <Pill key={c.type} tone="neutral">
                {c.count}× {c.type} {c.powerKw}kW
              </Pill>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-3 text-bodysm">
            <span className="inline-flex items-center gap-1.5">
              <LiveDot />
              <span className="text-accent-neon">Live · {station.available}/{station.total} available</span>
            </span>
            <span className="text-ink-secondary tabular">{station.pricePerKwh} THB/kWh</span>
            <span className="text-ink-secondary inline-flex items-center gap-1">
              <Star size={12} fill="currentColor" /> {station.rating} · {station.reviews} reviews
            </span>
          </div>

          {snap !== "peek" && (
            <>
              <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-32 h-24 rounded-card bg-gradient-to-br from-bg-elevated to-bg-base border border-border-subtle shrink-0 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 dotgrid" />
                    <div className="absolute bottom-1.5 left-2 text-cap text-ink-secondary">Photo {i + 1}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-3">
                <Row label="Address" value="123 Sukhumvit Rd, Asoke, Bangkok" right={<Copy size={16} className="text-ink-secondary" />} />
                <Row label="Hours" value="Open 24/7" />
                <div className="flex items-center gap-3 text-bodysm pt-1">
                  <Coffee size={16} /> Restroom · Food · Wi-Fi · Covered <Wifi size={14} />
                </div>
              </div>

              <Button variant="secondary" className="mt-4" onClick={() => go("F3.2")}>
                <span className="inline-flex items-center gap-2">
                  <Navigation size={18} /> Get directions
                </span>
              </Button>

              {snap === "full" && (
                <div className="mt-6 space-y-4">
                  <div className="text-bodysm text-ink-secondary uppercase tracking-wide">Connectors</div>
                  {station.connectors.map((c) => (
                    <div key={c.type} className="bg-bg-elevated rounded-card p-3 border border-border-subtle">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{c.type} · {c.powerKw} kW</div>
                        <Pill tone="neon">Available</Pill>
                      </div>
                      <div className="text-cap text-ink-secondary mt-1 tabular">
                        {station.pricePerKwh} THB/kWh · {c.count} ports
                      </div>
                    </div>
                  ))}

                  <div className="text-bodysm text-ink-secondary uppercase tracking-wide">Live availability</div>
                  <div className="grid grid-cols-12 gap-1">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const v = (Math.sin(i * 0.7) + 1) / 2;
                      return (
                        <div
                          key={i}
                          className="aspect-square rounded-sm"
                          style={{
                            background: `rgba(0, 230, 118, ${0.15 + v * 0.6})`,
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="text-bodysm text-ink-secondary uppercase tracking-wide">Reviews</div>
                  {[
                    { user: "Aon", stars: 5, body: "Fast charging, easy parking, clean restroom." },
                    { user: "Mai", stars: 4, body: "All chargers worked. A bit busy at lunchtime." },
                  ].map((r) => (
                    <div key={r.user} className="bg-bg-elevated rounded-card p-3 border border-border-subtle">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-bg-surface flex items-center justify-center text-cap font-semibold">{r.user[0]}</div>
                        <div className="text-bodysm">{r.user}</div>
                        <div className="ml-auto inline-flex gap-0.5 text-accent-neon">
                          {Array.from({ length: r.stars }).map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 text-bodysm text-ink-secondary">{r.body}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-gutter pb-6 border-t border-border-subtle">
          <Button onClick={() => go("F2.5")}>
            <span className="inline-flex items-center gap-2">
              <Zap size={18} /> Open in EV Station PluZ
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, right }: { label: string; value: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 text-bodysm">
      <div>
        <div className="text-cap text-ink-secondary">{label}</div>
        <div>{value}</div>
      </div>
      {right}
    </div>
  );
}
