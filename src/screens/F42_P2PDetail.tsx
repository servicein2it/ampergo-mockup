import { Star, Verified } from "lucide-react";
import { useState } from "react";
import { Button, Pill } from "../components/UI";
import { P2P_LISTING } from "../data/demo";
import { ScreenId } from "../types";

export function F42_P2PDetail({ go }: { go: (s: ScreenId) => void }) {
  const [snap, setSnap] = useState<"peek" | "default" | "full">("default");

  return (
    <div className="flex-1 relative bg-black/30">
      <div className="absolute inset-0" onClick={() => go("F4.1")} />
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
            <Star size={18} className="text-[#F5C518]" fill="#F5C518" />
            <div className="text-t2 flex-1">{P2P_LISTING.name}</div>
            <Pill>0.8 km</Pill>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Pill>{P2P_LISTING.power}</Pill>
            <Pill tone="neon">{P2P_LISTING.pricePerKwh} THB/kWh</Pill>
            <span className="text-bodysm text-ink-secondary inline-flex items-center gap-1">
              <Star size={12} fill="currentColor" /> {P2P_LISTING.rating} · {P2P_LISTING.sessions} sessions
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
                    <div className="absolute bottom-1 left-2 text-cap text-ink-secondary">
                      {["Wallbox", "Parking", "Gate", "Street"][i]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-bg-elevated rounded-card p-3 border border-border-subtle flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-neon/30 to-accent-cyan/30 flex items-center justify-center font-bold">
                  B
                </div>
                <div className="flex-1">
                  <div className="text-body inline-flex items-center gap-1.5">
                    {P2P_LISTING.hostName}
                    {P2P_LISTING.verified && (
                      <span className="inline-flex items-center gap-0.5 text-cap text-accent-neon">
                        <Verified size={12} fill="currentColor" className="text-bg-base" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="text-cap text-ink-secondary">{P2P_LISTING.bio}</div>
                </div>
              </div>

              <div className="mt-4 text-cap text-ink-secondary uppercase tracking-wide">Pricing</div>
              <div className="mt-2 bg-bg-elevated rounded-card p-3 border border-border-subtle space-y-2">
                <PriceRow label="Charging" value={`${P2P_LISTING.pricePerKwh} THB/kWh`} />
                <PriceRow label="Booking fee" value={`${P2P_LISTING.bookingFee} THB`} />
                <PriceRow label="AmperGo platform fee" value={`${P2P_LISTING.platformFeePct}% (included)`} muted />
              </div>

              <div className="mt-4 text-cap text-ink-secondary uppercase tracking-wide">Location</div>
              <div className="mt-2 text-bodysm">{P2P_LISTING.neighborhood}</div>
              <div className="text-cap text-ink-secondary">Exact address shared after booking.</div>

              {snap === "full" && (
                <>
                  <div className="mt-4 text-cap text-ink-secondary uppercase tracking-wide">House rules</div>
                  <ul className="mt-2 space-y-2">
                    {P2P_LISTING.rules.map((r) => (
                      <li key={r} className="text-bodysm flex gap-2">
                        <span className="text-accent-neon mt-1">•</span> {r}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 text-cap text-ink-secondary uppercase tracking-wide">Cancellation</div>
                  <p className="text-bodysm mt-1 text-ink-secondary">Free cancellation up to 1 hour before your booking.</p>
                  <button className="mt-4 text-bodysm text-ink-secondary py-2">Report this listing</button>
                </>
              )}
            </>
          )}
        </div>

        <div className="p-gutter pb-6 border-t border-border-subtle">
          <Button onClick={() => go("F4.3")}>See available times</Button>
        </div>
      </div>
    </div>
  );
}

function PriceRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between text-bodysm">
      <span className={muted ? "text-ink-secondary" : ""}>{label}</span>
      <span className={`font-mono tabular ${muted ? "text-ink-secondary" : "text-ink-primary"}`}>{value}</span>
    </div>
  );
}
