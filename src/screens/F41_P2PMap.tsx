import { Compass, Layers, Menu, Search } from "lucide-react";
import { Chip } from "../components/UI";
import { TabBar } from "../components/TabBar";
import { MapMock, Pin } from "../components/MapMock";
import { NETWORK_COLORS, USER } from "../data/demo";
import { Lang, ScreenId } from "../types";
import { useState } from "react";
import { LangToggle } from "../components/LangToggle";
import { t } from "../i18n";

const P2P_PINS: Pin[] = [
  { id: "p1", x: 35, y: 38, color: NETWORK_COLORS.P2P, kind: "p2p", pulse: true },
  { id: "p2", x: 42, y: 50, color: NETWORK_COLORS.P2P, kind: "p2p" },
  { id: "p3", x: 60, y: 70, color: NETWORK_COLORS.P2P, kind: "p2p" },
  { id: "p4", x: 75, y: 30, color: NETWORK_COLORS.P2P, kind: "p2p" },
  { id: "p5", x: 22, y: 65, color: NETWORK_COLORS.P2P, kind: "p2p" },
];

const FILTERS = ["All P2P", "≤10 THB/kWh", "22 kW only", "Available now", "Verified hosts", "Near a hotel"];

export function F41_P2PMap({
  lang,
  setLang,
  go,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  go: (s: ScreenId) => void;
}) {
  const [active, setActive] = useState<string>("All P2P");

  return (
    <div className="flex-1 flex flex-col relative">
      <div className="flex-1 relative">
        <MapMock pins={P2P_PINS} rangeKm={USER.rangeKm}>
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
              {FILTERS.map((c) => (
                <Chip key={c} active={active === c} onClick={() => setActive(c)}>
                  {c}
                </Chip>
              ))}
            </div>
            <div className="mt-3 bg-bg-elevated/95 border-l-2 border-accent-neon rounded-r-card p-2.5 backdrop-blur flex items-center justify-between">
              <span className="text-bodysm">Showing private chargers only</span>
              <button className="text-cap text-accent-neon font-semibold" onClick={() => go("F2.1")}>Show all</button>
            </div>
          </div>

          <button
            onClick={() => go("F4.2")}
            className="absolute z-20"
            style={{ left: "42%", top: "50%", width: 40, height: 40, transform: "translate(-50%, -100%)" }}
          />

          <div className="absolute right-3 bottom-32 flex flex-col gap-3 z-20">
            <button className="w-11 h-11 bg-bg-elevated/95 border border-border-subtle rounded-full flex items-center justify-center backdrop-blur">
              <Compass size={20} />
            </button>
            <button className="w-11 h-11 bg-bg-elevated/95 border border-border-subtle rounded-full flex items-center justify-center backdrop-blur">
              <Layers size={18} />
            </button>
          </div>

          <button
            onClick={() => go("F4.6")}
            className="absolute left-1/2 -translate-x-1/2 bottom-28 z-20 h-10 px-4 bg-bg-elevated/95 border border-accent-neon rounded-full text-accent-neon text-bodysm font-semibold backdrop-blur shadow-neonSoft"
          >
            ⭐ Become a host
          </button>
        </MapMock>
      </div>

      <TabBar active="map" onNavigate={go} fab={{ onClick: () => go("F3.1") }} />
    </div>
  );
}
