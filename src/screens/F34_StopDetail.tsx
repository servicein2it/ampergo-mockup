import { Coffee, Repeat, Wifi, Zap } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { Button, Card, Pill, SegBar } from "../components/UI";
import { ScreenId } from "../types";

export function F34_StopDetail({ go }: { go: (s: ScreenId) => void }) {
  const stop = {
    name: "EA Anywhere Nakhon Sawan",
    network: "EA Anywhere",
    networkColor: "#10B981",
    power: "DC 150 kW",
    distance: "240 km from Bangkok",
    eta: "ETA 17:10 (in 2h 40m)",
    socStart: 35,
    socEnd: 85,
    addedKwh: 30.2,
    timeMin: 25,
    costThb: 242,
    pricePerKwh: 8,
  };

  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <AppBar title="Charging Stop 1 of 3" onBack={() => go("F3.3")} />
      <div className="flex-1 phone-scroll px-gutter pb-6">
        <Card className="!p-0 overflow-hidden">
          <div className="h-1" style={{ background: stop.networkColor }} />
          <div className="p-4">
            <div className="text-t1">{stop.name}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full" style={{ background: stop.networkColor }} />
              <div className="text-bodysm text-ink-secondary">{stop.network} · {stop.power}</div>
            </div>
            <div className="text-cap text-ink-secondary mt-2">{stop.distance} · {stop.eta}</div>
          </div>
        </Card>

        <div className="mt-4 text-cap text-ink-secondary uppercase tracking-wide">Charging plan</div>
        <Card className="mt-2">
          <SegBar start={stop.socStart} end={stop.socEnd} />
          <div className="flex justify-between mt-2 text-cap text-ink-secondary tabular">
            <span>Start {stop.socStart}%</span>
            <span>End {stop.socEnd}%</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <Stat label="Energy added" value={`+${stop.addedKwh} kWh`} />
            <Stat label="Charging time" value={`${stop.timeMin} min`} />
            <Stat label="Cost" value={`${stop.costThb} ฿`} />
          </div>
          <div className="mt-3 text-cap text-ink-secondary">
            Charging slows above 80%. We stop at 85% to save time.
          </div>
        </Card>

        <div className="mt-4 text-cap text-ink-secondary uppercase tracking-wide">Connector</div>
        <Card className="mt-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">CCS2 · 150 kW</div>
              <div className="text-cap text-ink-secondary tabular">{stop.pricePerKwh} THB/kWh</div>
            </div>
            <Pill tone="neon">Available now</Pill>
          </div>
        </Card>

        <div className="mt-4 text-cap text-ink-secondary uppercase tracking-wide">Amenities</div>
        <Card className="mt-2">
          <div className="flex items-center gap-4 text-bodysm text-ink-secondary">
            <span className="inline-flex items-center gap-1.5"><Coffee size={16} /> Food</span>
            <span className="inline-flex items-center gap-1.5"><Wifi size={16} /> Wi-Fi</span>
            <span className="inline-flex items-center gap-1.5">Restroom</span>
          </div>
          <button className="mt-2 text-bodysm text-accent-neon">What's nearby →</button>
        </Card>
      </div>
      <div className="px-gutter pb-6 pt-3 border-t border-border-subtle space-y-2 bg-bg-base">
        <Button onClick={() => go("F2.5")}>
          <span className="inline-flex items-center gap-2">
            <Zap size={18} /> Open in EA Anywhere
          </span>
        </Button>
        <Button variant="secondary">
          <span className="inline-flex items-center gap-2">
            <Repeat size={16} /> Replace this stop
          </span>
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-cap text-ink-secondary">{label}</div>
      <div className="font-mono text-body tabular mt-0.5">{value}</div>
    </div>
  );
}
