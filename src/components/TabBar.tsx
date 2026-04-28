import { Map, Route, Zap, User } from "lucide-react";
import { ScreenId } from "../types";

type Tab = "map" | "routes" | "charge" | "profile";

const TABS: { id: Tab; label: string; icon: any; target: ScreenId }[] = [
  { id: "map", label: "Map", icon: Map, target: "F2.1" },
  { id: "routes", label: "Routes", icon: Route, target: "F3.1" },
  { id: "charge", label: "Charge", icon: Zap, target: "F4.4" },
  { id: "profile", label: "Profile", icon: User, target: "F4.8" },
];

export function TabBar({
  active,
  onNavigate,
  fab,
}: {
  active: Tab;
  onNavigate: (s: ScreenId) => void;
  fab?: { label?: string; onClick: () => void };
}) {
  return (
    <div className="relative shrink-0">
      {fab && (
        <button
          onClick={fab.onClick}
          className="absolute left-1/2 -translate-x-1/2 -top-7 w-16 h-16 rounded-full bg-accent-neon text-bg-base shadow-neon flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Plan a route"
        >
          <Zap size={28} fill="currentColor" />
        </button>
      )}
      <div className="h-20 bg-bg-base/95 backdrop-blur border-t border-border-subtle flex items-end pt-2 pb-4 px-2">
        <div className="flex-1 grid grid-cols-4">
          {TABS.map((tab, i) => {
            const isActive = tab.id === active;
            const Icon = tab.icon;
            const isCenterPair = i === 1 || i === 2;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.target)}
                className={`flex flex-col items-center gap-1 ${isCenterPair ? "px-6" : ""}`}
              >
                <Icon
                  size={22}
                  className={isActive ? "text-accent-neon" : "text-ink-secondary"}
                />
                <span
                  className={`text-cap ${isActive ? "text-accent-neon font-semibold" : "text-ink-secondary"}`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
