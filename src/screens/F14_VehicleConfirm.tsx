import { Link, Plug, Settings2 } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { Button, Card, Pill } from "../components/UI";
import { VEHICLE } from "../data/demo";
import { t } from "../i18n";
import { Lang, ScreenId } from "../types";

export function F14_VehicleConfirm({
  lang,
  go,
}: {
  lang: Lang;
  go: (s: ScreenId) => void;
}) {
  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <AppBar title={t("confirmVehicle", lang)} onBack={() => go("F1.3")} />
      <div className="flex-1 phone-scroll px-gutter pb-6">
        <Card className="!p-0 overflow-hidden">
          <div className="h-[180px] relative bg-gradient-to-br from-[#1c2430] to-[#0a0e14] flex items-center justify-center">
            <CarSilhouette />
            <div className="absolute top-3 left-3">
              <Pill tone="neon">2024-2026</Pill>
            </div>
          </div>
          <div className="p-4">
            <div className="text-display tracking-tight">{VEHICLE.brand} {VEHICLE.model}</div>
            <div className="text-bodysm text-ink-secondary">{VEHICLE.trim}</div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <SpecCell label="Battery" value={`${VEHICLE.batteryKwh} kWh`} />
          <SpecCell label="Range (WLTP)" value={`${VEHICLE.rangeKm} km`} />
          <SpecCell label="Connector" value={VEHICLE.connector} />
          <SpecCell label="DC max" value={`${VEHICLE.dcMaxKw} kW`} />
          <SpecCell label="Cons. (city)" value={`${VEHICLE.consumptionCity} Wh/km`} />
          <SpecCell label="Cons. (mixed)" value={`${VEHICLE.consumptionMixed} Wh/km`} />
          <SpecCell label="Cons. (hwy)" value={`${VEHICLE.consumptionHwy} Wh/km`} />
          <SpecCell label="Year" value={VEHICLE.year} />
        </div>

        <div className="mt-6 space-y-3">
          <Card className="!p-4">
            <div className="flex items-center gap-2 mb-2">
              <Link size={20} className="text-accent-neon" />
              <div className="text-t2">{t("connectHead", lang)}</div>
              <Pill tone="neon" className="ml-auto">
                {t("recommended", lang)}
              </Pill>
            </div>
            <p className="text-bodysm text-ink-secondary mb-3">
              {t("connectBody", lang)}
            </p>
            <Button onClick={() => go("F1.5")}>{t("connectNow", lang)}</Button>
          </Card>

          <Card className="!p-4">
            <div className="flex items-center gap-2 mb-2">
              <Plug size={20} className="text-ink-secondary" />
              <div className="text-t2">{t("manualHead", lang)}</div>
            </div>
            <p className="text-bodysm text-ink-secondary mb-3">
              {t("manualBody", lang)}
            </p>
            <Button variant="secondary" onClick={() => go("F1.6")}>
              {t("manualUse", lang)}
            </Button>
          </Card>
        </div>

        <button className="mt-4 w-full text-bodysm text-ink-secondary inline-flex items-center justify-center gap-2 py-2">
          <Settings2 size={14} /> {t("editSpecs", lang)}
        </button>
      </div>
    </div>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-card p-3">
      <div className="text-cap text-ink-secondary">{label}</div>
      <div className="font-mono text-body tabular mt-0.5">{value}</div>
    </div>
  );
}

function CarSilhouette() {
  return (
    <svg width="220" height="100" viewBox="0 0 220 100">
      <defs>
        <linearGradient id="carg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00E676" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#00E676" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00E676" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <rect x="0" y="70" width="220" height="2" fill="url(#carg)" />
      <path
        d="M20 70 L40 50 Q 50 40, 70 38 L 130 38 Q 160 40, 175 50 L 200 70 Z"
        fill="#1c2430"
        stroke="#00E676"
        strokeWidth="1.2"
      />
      <path
        d="M55 50 Q 65 42, 80 42 L 125 42 Q 140 44, 150 52 L 55 50 Z"
        fill="rgba(0, 212, 255, 0.18)"
        stroke="rgba(0, 212, 255, 0.4)"
        strokeWidth="0.5"
      />
      <circle cx="55" cy="72" r="10" fill="#0a0e14" stroke="#222b38" />
      <circle cx="55" cy="72" r="5" fill="#222b38" />
      <circle cx="165" cy="72" r="10" fill="#0a0e14" stroke="#222b38" />
      <circle cx="165" cy="72" r="5" fill="#222b38" />
    </svg>
  );
}
