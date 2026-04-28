import { ChevronRight, Clock, MapPin, Search, Star, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Lang, ScreenId } from "../types";
import { t } from "../i18n";

const RECENTS = ["Home", "Work", "Bangkok"];
const SAVED = ["Home", "Parents' house", "Hotel Sukhumvit"];
const SUGGESTIONS = [
  { name: "Chiang Mai", sub: "Northern Thailand · 696 km" },
  { name: "Hua Hin", sub: "Prachuap Khiri Khan · 199 km" },
  { name: "Pattaya", sub: "Chonburi · 147 km" },
  { name: "Khao Yai", sub: "Nakhon Ratchasima · 190 km" },
];
const STATIONS = [
  { name: "PluZ Asoke", sub: "Sukhumvit · 1.2 km" },
  { name: "EA Anywhere Rama 9", sub: "Bangkok · 2.8 km" },
];

export function F23_Search({
  lang,
  go,
  onPick,
}: {
  lang: Lang;
  go: (s: ScreenId) => void;
  onPick?: (place: string) => void;
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q) return null;
    const all = [
      ...SUGGESTIONS.map((s) => ({ ...s, _kind: "suggestion" as const })),
      ...STATIONS.map((s) => ({ ...s, _kind: "station" as const })),
    ];
    return all.filter((x) => x.name.toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <div className="h-14 px-3 flex items-center gap-2">
        <button onClick={() => go("F2.1")} className="w-10 h-10 flex items-center justify-center">
          <X size={20} />
        </button>
        <div className="flex-1 h-11 bg-bg-surface border border-border-subtle rounded-btn flex items-center px-3 gap-2 focus-within:border-accent-neon">
          <Search size={18} className="text-ink-secondary" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("searchAnyPlace", lang)}
            className="bg-transparent flex-1 outline-none text-body"
          />
          {q && (
            <button onClick={() => setQ("")}>
              <X size={16} className="text-ink-secondary" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 phone-scroll">
        {filtered ? (
          <Section label="Results">
            {filtered.map((s) => (
              <Row
                key={s.name}
                icon={s._kind === "station" ? <Pin /> : <MapPin size={18} />}
                title={s.name}
                sub={s.sub}
                onClick={() => {
                  onPick?.(s.name);
                  go("F3.2");
                }}
              />
            ))}
            {filtered.length === 0 && (
              <div className="px-gutter py-8 text-center text-ink-secondary text-bodysm">
                We couldn't find that. Try a different spelling or pick from the map.
              </div>
            )}
          </Section>
        ) : (
          <>
            <Section label="Recent">
              {RECENTS.map((r) => (
                <Row key={r} icon={<Clock size={18} />} title={r} onClick={() => go("F3.2")} />
              ))}
            </Section>
            <Section label="Saved">
              {SAVED.map((r) => (
                <Row key={r} icon={<Star size={18} className="text-accent-neon" />} title={r} onClick={() => go("F3.2")} />
              ))}
            </Section>
            <Section label="Suggestions">
              {SUGGESTIONS.map((s) => (
                <Row
                  key={s.name}
                  icon={<MapPin size={18} />}
                  title={s.name}
                  sub={s.sub}
                  onClick={() => {
                    onPick?.(s.name);
                    go("F3.2");
                  }}
                />
              ))}
            </Section>
            <Section label="Stations">
              {STATIONS.map((s) => (
                <Row
                  key={s.name}
                  icon={<Pin />}
                  title={s.name}
                  sub={s.sub}
                  onClick={() => go("F2.4")}
                />
              ))}
            </Section>
          </>
        )}
      </div>
    </div>
  );
}

function Pin() {
  return <span className="w-3 h-3 rounded-full bg-accent-neon inline-block" />;
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <div className="px-gutter py-2 text-cap text-ink-secondary uppercase tracking-wide">{label}</div>
      <div className="border-t border-border-subtle">{children}</div>
    </div>
  );
}

function Row({
  icon,
  title,
  sub,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  sub?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full px-gutter h-14 flex items-center gap-3 border-b border-border-subtle text-left active:bg-white/5"
    >
      <span className="w-8 h-8 rounded-full bg-bg-surface flex items-center justify-center text-ink-secondary shrink-0">
        {icon}
      </span>
      <div className="flex-1">
        <div className="text-body">{title}</div>
        {sub && <div className="text-cap text-ink-secondary">{sub}</div>}
      </div>
      <ChevronRight size={18} className="text-ink-secondary" />
    </button>
  );
}
