import { useState } from "react";
import { Button, Chip } from "../components/UI";
import { ScreenId } from "../types";

const NETWORKS = ["PluZ", "EA Anywhere", "PEA VOLTA", "EleX", "MG Super Charge", "Evolt", "Sharge", "P2P", "Other"];
const CONNECTORS = ["CCS2", "CHAdeMO", "Type 2", "GB/T"];
const POWERS = ["Any", "≥50 kW", "≥100 kW", "≥150 kW", "≥350 kW"];
const AMENITIES = ["Restroom", "Food", "Covered", "Wi-Fi", "Lounge"];

export function F22_FiltersSheet({ go }: { go: (s: ScreenId) => void }) {
  const [networks, setNetworks] = useState<string[]>([]);
  const [connectors, setConnectors] = useState<string[]>(["CCS2"]);
  const [power, setPower] = useState("≥50 kW");
  const [open247, setOpen247] = useState(false);
  const [available, setAvailable] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [amenities, setAmenities] = useState<string[]>([]);

  const toggle = (arr: string[], setter: (v: string[]) => void, val: string) =>
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const count = 247 - networks.length * 18 - connectors.length * 5;

  return (
    <div className="flex-1 flex flex-col bg-black/50 relative">
      <div className="absolute inset-0" onClick={() => go("F2.1")} />
      <div className="absolute inset-x-0 bottom-0 bg-bg-surface rounded-t-sheet border-t border-border-subtle pt-3 pb-0 flex flex-col" style={{ height: "85%" }}>
        <div className="flex justify-center pb-1">
          <div className="w-9 h-1 rounded-full bg-ink-disabled" />
        </div>
        <div className="px-gutter flex items-center justify-between pb-2">
          <div className="text-t2">Filters</div>
          <button className="text-bodysm text-accent-neon" onClick={() => {
            setNetworks([]); setConnectors([]); setPower("Any"); setAmenities([]);
          }}>Reset</button>
        </div>
        <div className="flex-1 phone-scroll px-gutter pb-4 space-y-5">
          <Section label="Network">
            <div className="flex flex-wrap gap-2">
              {NETWORKS.map((n) => (
                <Chip key={n} active={networks.includes(n)} onClick={() => toggle(networks, setNetworks, n)}>{n}</Chip>
              ))}
            </div>
          </Section>
          <Section label="Connector">
            <div className="flex flex-wrap gap-2">
              {CONNECTORS.map((c) => (
                <Chip key={c} active={connectors.includes(c)} onClick={() => toggle(connectors, setConnectors, c)}>{c}</Chip>
              ))}
            </div>
          </Section>
          <Section label="Power">
            <div className="flex bg-bg-elevated rounded-full p-1">
              {POWERS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPower(p)}
                  className={`flex-1 h-9 rounded-full text-cap font-semibold ${
                    power === p ? "bg-accent-neon text-bg-base" : "text-ink-secondary"
                  }`}
                >{p}</button>
              ))}
            </div>
          </Section>
          <Toggle label="Show available chargers only" value={available} onChange={setAvailable} />
          <Toggle label="Show price per kWh on pins" value={showPrice} onChange={setShowPrice} />
          <Toggle label="Open 24/7 only" value={open247} onChange={setOpen247} />
          <Section label="Amenities">
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map((a) => (
                <Chip key={a} active={amenities.includes(a)} onClick={() => toggle(amenities, setAmenities, a)}>{a}</Chip>
              ))}
            </div>
          </Section>
          <Section label="Rating">
            <div className="flex gap-2">
              {["Any", "3+", "4+", "4.5+"].map((r) => (
                <Chip key={r}>{r}</Chip>
              ))}
            </div>
          </Section>
        </div>
        <div className="px-gutter pb-6 pt-3 border-t border-border-subtle">
          <Button onClick={() => go("F2.1")}>{count > 0 ? `Show ${count} chargers` : "No matches — adjust filters"}</Button>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-bodysm text-ink-secondary mb-2">{label}</div>
      {children}
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-body">{label}</div>
      <button
        onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
          value ? "bg-accent-neon" : "bg-bg-elevated"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white transition-transform ${
            value ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
