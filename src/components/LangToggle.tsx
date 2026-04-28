import { Lang } from "../types";

export function LangToggle({
  value,
  onChange,
  className = "",
}: {
  value: Lang;
  onChange: (l: Lang) => void;
  className?: string;
}) {
  return (
    <div
      className={`h-8 inline-flex bg-bg-elevated rounded-full p-0.5 border border-border-subtle ${className}`}
    >
      {(["EN", "TH"] as const).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`h-7 px-3 rounded-full text-cap font-semibold transition-colors ${
            value === l ? "bg-accent-neon text-bg-base" : "text-ink-secondary"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
