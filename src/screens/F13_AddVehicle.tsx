import { ChevronRight, Search, WifiOff } from "lucide-react";
import { useMemo, useState } from "react";
import { AppBar } from "../components/AppBar";
import { LangToggle } from "../components/LangToggle";
import { Chip, Input } from "../components/UI";
import { BRANDS, VEHICLES_CATALOG } from "../data/demo";
import { t } from "../i18n";
import { Lang, ScreenId } from "../types";

export function F13_AddVehicle({
  lang,
  setLang,
  go,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  go: (s: ScreenId) => void;
}) {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("All");

  const filtered = useMemo(() => {
    return VEHICLES_CATALOG.filter((v) => {
      const matchesBrand = brand === "All" || v.brand === brand;
      const text = `${v.brand} ${v.model}`.toLowerCase();
      return matchesBrand && text.includes(q.toLowerCase());
    });
  }, [q, brand]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof VEHICLES_CATALOG>();
    for (const v of filtered) {
      const arr = map.get(v.brand) ?? [];
      arr.push(v);
      map.set(v.brand, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <AppBar
        title={t("addVehicle", lang)}
        onBack={() => go("F1.2")}
        right={<LangToggle value={lang} onChange={setLang} />}
      />
      <div className="px-gutter pt-2">
        <Input
          value={q}
          onChange={setQ}
          placeholder={t("searchVehicle", lang)}
          icon={<Search size={20} />}
        />
        <div className="flex items-center gap-1 mt-2 text-cap text-ink-disabled">
          <WifiOff size={12} /> Catalog cached offline · top 200 models
        </div>
      </div>
      <div className="px-gutter mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {BRANDS.map((b) => (
          <Chip key={b} active={b === brand} onClick={() => setBrand(b)}>
            {b}
          </Chip>
        ))}
        <Chip onClick={() => setBrand("All")}>MORE</Chip>
      </div>

      <div className="flex-1 phone-scroll mt-3 pb-6">
        {grouped.length === 0 ? (
          <div className="px-gutter text-center pt-12">
            <div className="text-t2 mb-2">{t("noModelHead", lang)}</div>
            <p className="text-bodysm text-ink-secondary mb-4">
              {t("noModelBody", lang)}
            </p>
            <button className="text-accent-neon font-semibold">
              {t("requestModel", lang)}
            </button>
          </div>
        ) : (
          grouped.map(([brand, items]) => (
            <div key={brand} className="mb-2">
              <div className="px-gutter py-2 text-bodysm text-ink-secondary">
                {brand}
              </div>
              <div className="px-gutter flex flex-col gap-2">
                {items.map((v) => (
                  <button
                    key={`${v.brand}-${v.model}`}
                    onClick={() => go("F1.4")}
                    className="bg-bg-surface border border-border-subtle rounded-card p-3 flex items-center gap-3 active:opacity-80"
                  >
                    <div className="w-14 h-10 rounded-md bg-gradient-to-br from-bg-elevated to-bg-base flex items-center justify-center text-cap text-ink-secondary tabular">
                      EV
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-t2">{v.brand} {v.model}</div>
                      <div className="text-bodysm text-ink-secondary tabular">
                        {v.spec}
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-ink-secondary" />
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
