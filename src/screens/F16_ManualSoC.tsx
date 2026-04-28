import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { Button, Chip } from "../components/UI";
import { t } from "../i18n";
import { Lang, ScreenId } from "../types";

export function F16_ManualSoC({
  lang,
  go,
}: {
  lang: Lang;
  go: (s: ScreenId) => void;
}) {
  const [soc, setSoc] = useState(80);

  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <AppBar title={t("batteryLevel", lang)} onBack={() => go("F1.4")} />
      <div className="flex-1 px-gutter flex flex-col">
        <div className="pt-12 flex items-baseline justify-center">
          <div className="font-mono text-[80px] leading-none font-bold tabular text-accent-neon">
            {soc}
          </div>
          <div className="text-display text-ink-disabled ml-1">%</div>
        </div>
        <div className="text-center text-bodysm text-ink-secondary mt-2">
          {t("tapAdjust", lang)}
        </div>

        <div className="mt-12 px-2">
          <input
            type="range"
            min={0}
            max={100}
            value={soc}
            onChange={(e) => setSoc(Number(e.target.value))}
            className="w-full accent-[#00E676] h-1.5"
            style={{
              background: `linear-gradient(to right, #00E676 0%, #00E676 ${soc}%, #1C2430 ${soc}%, #1C2430 100%)`,
              borderRadius: 999,
            }}
          />
          <div className="flex justify-between mt-2 text-cap text-ink-secondary tabular">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="mt-6 flex gap-2 justify-center">
          {[100, 80, 50, 20].map((v) => (
            <Chip key={v} active={soc === v} onClick={() => setSoc(v)}>
              {v}%
            </Chip>
          ))}
        </div>

        <p className="mt-8 px-2 text-bodysm text-ink-secondary text-center">
          {t("socHelper", lang)}
        </p>

        <div className="mt-auto pb-6">
          <Button onClick={() => go("F1.7")}>{t("saveBattery", lang)}</Button>
        </div>
      </div>
    </div>
  );
}
