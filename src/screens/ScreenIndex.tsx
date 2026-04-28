import { LangToggle } from "../components/LangToggle";
import { Lang, ScreenId } from "../types";

const GROUPS: { name: string; items: { id: ScreenId; label: string }[] }[] = [
  {
    name: "Flow 1 — Onboarding",
    items: [
      { id: "F1.1", label: "Splash" },
      { id: "F1.2", label: "Sign-in" },
      { id: "F1.3", label: "Add Vehicle" },
      { id: "F1.4", label: "Vehicle Confirmation" },
      { id: "F1.5", label: "Connect (Smartcar)" },
      { id: "F1.6", label: "Manual SoC Entry" },
      { id: "F1.7", label: "Permissions" },
      { id: "F1.8", label: "First-Run Tooltip" },
    ],
  },
  {
    name: "Flow 2 — Station Map",
    items: [
      { id: "F2.1", label: "Home Map" },
      { id: "F2.2", label: "Filters Sheet" },
      { id: "F2.3", label: "Search" },
      { id: "F2.4", label: "Station Detail" },
      { id: "F2.5", label: "Deep-Link Handoff" },
    ],
  },
  {
    name: "Flow 3 — Route Planning ★",
    items: [
      { id: "F3.1", label: "Destination Input" },
      { id: "F3.2", label: "Route Preview (G/Y/R)" },
      { id: "F3.3", label: "Trip Plan Card" },
      { id: "F3.4", label: "Charging Stop Detail" },
      { id: "F3.5", label: "Live Navigation" },
      { id: "F3.6", label: "Recalculation Banner" },
    ],
  },
  {
    name: "Flow 4 — P2P Marketplace",
    items: [
      { id: "F4.1", label: "P2P-only Map" },
      { id: "F4.2", label: "P2P Listing Detail" },
      { id: "F4.3", label: "P2P Booking" },
      { id: "F4.4", label: "Active P2P Session" },
      { id: "F4.5", label: "Post-session Rating" },
      { id: "F4.6", label: "Become a Host" },
      { id: "F4.7", label: "Register Charger Wizard" },
      { id: "F4.8", label: "Host Dashboard" },
    ],
  },
];

const PITCH_PATH: ScreenId[] = [
  "F1.1", "F1.2", "F1.4",
  "F2.1", "F2.4", "F2.5",
  "F3.1", "F3.2", "F3.3",
  "F3.5", "F3.6",
  "F4.1", "F4.2", "F4.3",
  "F4.8",
];

export function ScreenIndex({
  current,
  onPick,
  lang,
  setLang,
}: {
  current: ScreenId;
  onPick: (s: ScreenId) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const idx = PITCH_PATH.indexOf(current);
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-card p-4 w-[320px] max-h-[844px] overflow-y-auto phone-scroll">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-t2">AmperGo Mockup</div>
          <div className="text-cap text-ink-secondary">v1.0 · 26 screens</div>
        </div>
        <LangToggle value={lang} onChange={setLang} />
      </div>

      <div className="bg-bg-elevated rounded-btn p-3 border border-border-subtle">
        <div className="text-cap text-ink-secondary uppercase tracking-wide mb-2">Investor demo path</div>
        <div className="flex flex-wrap gap-1.5">
          {PITCH_PATH.map((id, i) => (
            <button
              key={id}
              onClick={() => onPick(id)}
              className={`text-cap font-mono tabular px-2 h-7 rounded-full border ${
                id === current
                  ? "bg-accent-neon text-bg-base border-accent-neon font-semibold"
                  : i <= idx
                    ? "border-accent-neon/40 text-accent-neon"
                    : "border-border-subtle text-ink-secondary"
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {GROUPS.map((g) => (
          <div key={g.name}>
            <div className="text-cap text-ink-secondary uppercase tracking-wide mb-1.5">{g.name}</div>
            <div className="space-y-0.5">
              {g.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPick(item.id)}
                  className={`w-full h-8 px-2 rounded-md flex items-center gap-2 text-bodysm text-left ${
                    item.id === current ? "bg-accent-neon/15 text-accent-neon" : "hover:bg-bg-elevated"
                  }`}
                >
                  <span className="font-mono tabular text-cap text-ink-secondary w-9">{item.id}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-cap text-ink-disabled leading-relaxed">
        Tip: tap pins on the map, drag bottom sheets, watch Live Nav drift below predicted SoC to trigger F3.6.
      </div>
    </div>
  );
}
