import { Compass, Layers, Menu, Search } from "lucide-react";
import { LangToggle } from "../components/LangToggle";
import { Chip } from "../components/UI";
import { TabBar } from "../components/TabBar";
import { MapMock, Pin } from "../components/MapMock";
import { FILTER_CHIPS, NETWORK_COLORS, USER, STATIONS_DEMO } from "../data/demo";
import { Lang, ScreenId } from "../types";
import { useState } from "react";
import { t } from "../i18n";

const PINS: Pin[] = [
  { id: "pluz-1", x: 35, y: 38, color: NETWORK_COLORS.PluZ, kind: "cpo" },
  { id: "pluz-2", x: 68, y: 30, color: NETWORK_COLORS.PluZ, kind: "cpo" },
  { id: "ea-1", x: 28, y: 65, color: NETWORK_COLORS["EA Anywhere"], kind: "cpo", pulse: true },
  { id: "ea-2", x: 78, y: 60, color: NETWORK_COLORS["EA Anywhere"], kind: "cpo" },
  { id: "pea-1", x: 60, y: 70, color: NETWORK_COLORS["PEA VOLTA"], kind: "cpo" },
  { id: "elex-1", x: 22, y: 22, color: NETWORK_COLORS.EleX, kind: "cpo" },
  { id: "p2p-1", x: 42, y: 50, color: NETWORK_COLORS.P2P, kind: "p2p", pulse: true },
  { id: "p2p-2", x: 75, y: 78, color: NETWORK_COLORS.P2P, kind: "p2p" },
];

export function F21_HomeMap({
  lang,
  setLang,
  go,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  go: (s: ScreenId) => void;
}) {
  const [active, setActive] = useState<string[]>(["All"]);

  const toggle = (chip: string) => {
    if (chip === "All") setActive(["All"]);
    else setActive((cur) => {
      const without = cur.filter((c) => c !== "All");
      return without.includes(chip) ? without.filter((c) => c !== chip) : [...without, chip];
    });
  };

  return (
    <div className="flex-1 flex flex-col relative">
      <div className="flex-1 relative">
        <MapMock pins={PINS} rangeKm={USER.rangeKm}>
          {/* Top controls */}
          <div className="absolute top-3 left-3 right-3 z-20">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 bg-bg-elevated/90 backdrop-blur border border-border-subtle rounded-full flex items-center justify-center">
                <Menu size={20} />
              </button>
              <button
                onClick={() => go("F2.3")}
                className="flex-1 h-10 bg-bg-elevated/90 backdrop-blur border border-border-subtle rounded-full pl-3 pr-3 flex items-center gap-2 text-bodysm text-ink-secondary"
              >
                <Search size={18} />
                {t("searchAnyPlace", lang)}
              </button>
              <LangToggle value={lang} onChange={setLang} />
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
              {FILTER_CHIPS.map((c) => (
                <Chip key={c} active={active.includes(c)} onClick={() => toggle(c)}>
                  {c}
                </Chip>
              ))}
              <Chip onClick={() => go("F2.2")}>+ More</Chip>
            </div>
          </div>

          {/* Floating right buttons */}
          <div className="absolute right-3 bottom-32 flex flex-col gap-3 z-20">
            <button className="w-11 h-11 bg-bg-elevated/95 border border-border-subtle rounded-full flex items-center justify-center backdrop-blur">
              <Compass size={20} className="text-ink-primary" />
            </button>
            <button className="w-11 h-11 bg-bg-elevated/95 border border-border-subtle rounded-full flex items-center justify-center backdrop-blur">
              <Layers size={18} className="text-ink-primary" />
            </button>
          </div>

          {/* Demo: tap a pin */}
          <button
            onClick={() => go("F2.4")}
            className="absolute z-20"
            style={{ left: "28%", top: "65%", width: 40, height: 40, transform: "translate(-50%, -100%)" }}
            aria-label="Open station"
          />
          <button
            onClick={() => go("F4.2")}
            className="absolute z-20"
            style={{ left: "42%", top: "50%", width: 40, height: 40, transform: "translate(-50%, -100%)" }}
            aria-label="Open P2P"
          />

          {/* User SoC chip */}
          <div className="absolute left-3 bottom-32 z-20 bg-bg-elevated/95 border border-border-subtle rounded-full px-3 py-1.5 backdrop-blur flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-neon animate-pulse" />
            <span className="text-cap font-mono tabular text-accent-neon">{USER.soc}%</span>
            <span className="text-cap text-ink-secondary tabular">· {USER.rangeKm} km</span>
          </div>
        </MapMock>
      </div>

      <TabBar
        active="map"
        onNavigate={go}
        fab={{ onClick: () => go("F3.1") }}
      />
    </div>
  );
}
