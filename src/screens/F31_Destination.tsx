import { Battery, Clock, MapPin, Navigation, Plus } from "lucide-react";
import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { Button, Card, Pill } from "../components/UI";
import { USER, VEHICLE } from "../data/demo";
import { Lang, ScreenId } from "../types";
import { t } from "../i18n";

export function F31_Destination({
  lang,
  go,
}: {
  lang: Lang;
  go: (s: ScreenId) => void;
}) {
  const [to, setTo] = useState("Chiang Mai");
  const [departure, setDeparture] = useState<"now" | "later">("now");
  const [target, setTarget] = useState<"10" | "20" | "30" | "Custom">("20");

  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <AppBar
        title={t("planRoute", lang)}
        onBack={() => go("F2.1")}
        right={<button className="text-bodysm text-accent-neon px-2">Save</button>}
      />
      <div className="flex-1 phone-scroll px-gutter pb-6 space-y-4">
        <Card className="!p-0">
          <Row icon={<MapPin size={18} className="text-accent-neon" />} label="From">
            <div className="flex items-center justify-between">
              <span className="text-body">{t("currentLocation", lang)}</span>
              <Pill tone="neon">Use current</Pill>
            </div>
          </Row>
          <div className="border-t border-border-subtle ml-12" />
          <Row icon={<Navigation size={18} className="text-status-warning" />} label="To">
            <button
              onClick={() => go("F2.3")}
              className="w-full text-left text-body text-ink-primary"
            >
              {to}
            </button>
          </Row>
          <div className="border-t border-border-subtle ml-12" />
          <Row icon={<Plus size={18} className="text-ink-secondary" />} label="">
            <div className="flex items-center justify-between">
              <span className="text-body text-ink-secondary">+ Add stop</span>
              <Pill tone="neon">Pro · 7-day trial</Pill>
            </div>
          </Row>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-neon/15 flex items-center justify-center">
              <Battery size={20} className="text-accent-neon" />
            </div>
            <div className="flex-1">
              <div className="text-body">{VEHICLE.brand} {VEHICLE.model}</div>
              <div className="text-cap text-ink-secondary inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-neon animate-pulse" />
                Live · {USER.soc}% · ~{USER.rangeKm} km
              </div>
            </div>
          </div>
        </Card>

        <div>
          <div className="text-bodysm text-ink-secondary mb-2 inline-flex items-center gap-2">
            <Clock size={14} /> Departure
          </div>
          <div className="flex bg-bg-surface rounded-full p-1 border border-border-subtle">
            {(["now", "later"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setDeparture(v)}
                className={`flex-1 h-9 rounded-full text-bodysm font-semibold capitalize ${
                  departure === v ? "bg-accent-neon text-bg-base" : "text-ink-secondary"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-bodysm text-ink-secondary mb-2">Arrive with at least…</div>
          <div className="flex bg-bg-surface rounded-full p-1 border border-border-subtle">
            {(["10", "20", "30", "Custom"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setTarget(v)}
                className={`flex-1 h-9 rounded-full text-bodysm font-semibold ${
                  target === v ? "bg-accent-neon text-bg-base" : "text-ink-secondary"
                }`}
              >
                {v === "Custom" ? "Custom" : `${v}%`}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="px-gutter pb-6 border-t border-border-subtle pt-3">
        <Button onClick={() => go("F3.2")} disabled={!to}>{t("calcRoute", lang)}</Button>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="w-9 h-9 rounded-full bg-bg-elevated flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        {label && <div className="text-cap text-ink-secondary">{label}</div>}
        {children}
      </div>
    </div>
  );
}
