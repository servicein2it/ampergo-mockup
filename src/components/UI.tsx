import { ReactNode, ButtonHTMLAttributes } from "react";

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  full?: boolean;
  loading?: boolean;
};

export function Button({
  variant = "primary",
  full = true,
  loading,
  className = "",
  children,
  ...rest
}: BtnProps) {
  const base =
    "h-14 rounded-btn inline-flex items-center justify-center text-body active:scale-[0.99] transition-transform select-none";
  const w = full ? "w-full" : "px-5";
  const styles: Record<string, string> = {
    primary:
      "bg-accent-neon text-bg-base font-semibold hover:bg-[#00ff85] disabled:bg-bg-elevated disabled:text-ink-disabled",
    secondary:
      "bg-transparent border border-accent-neon text-accent-neon font-semibold hover:bg-accent-neon/10",
    tertiary:
      "h-12 bg-transparent text-ink-primary hover:bg-white/5",
    danger:
      "bg-status-critical text-white font-semibold",
  };
  return (
    <button
      className={`${base} ${w} ${styles[variant]} ${className}`}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.25"
        fill="none"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-8 px-3.5 rounded-full text-bodysm whitespace-nowrap transition-colors ${
        active
          ? "bg-accent-neon text-bg-base font-semibold"
          : "bg-bg-surface text-ink-secondary hover:text-ink-primary border border-border-subtle"
      }`}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
  bordered = true,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-bg-surface rounded-card p-4 ${
        bordered ? "border border-border-subtle" : ""
      } ${onClick ? "cursor-pointer active:opacity-80" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function Input({
  value,
  onChange,
  placeholder,
  icon,
  rightIcon,
  className = "",
}: {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`h-14 rounded-btn bg-bg-surface border border-border-subtle flex items-center px-4 gap-2 focus-within:border-accent-neon ${className}`}
    >
      {icon && <span className="text-ink-secondary">{icon}</span>}
      <input
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent flex-1 outline-none text-body placeholder:text-ink-disabled text-ink-primary"
      />
      {rightIcon}
    </div>
  );
}

export function StatBig({
  value,
  label,
  align = "left",
}: {
  value: string | number;
  label: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div className="font-mono text-t1 tabular text-ink-primary">{value}</div>
      <div className="text-cap text-ink-secondary mt-0.5">{label}</div>
    </div>
  );
}

export function Divider({ label }: { label?: string }) {
  if (!label) return <div className="h-px bg-border-subtle my-4" />;
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px bg-border-subtle flex-1" />
      <span className="text-cap text-ink-secondary uppercase tracking-wide">
        {label}
      </span>
      <div className="h-px bg-border-subtle flex-1" />
    </div>
  );
}

export function Pill({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "neon" | "warning" | "critical" | "cyan";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-bg-elevated text-ink-secondary border border-border-subtle",
    neon: "bg-accent-neon/15 text-accent-neon border border-accent-neon/30",
    warning: "bg-status-warning/15 text-status-warning border border-status-warning/30",
    critical: "bg-status-critical/15 text-status-critical border border-status-critical/30",
    cyan: "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-full text-cap tabular ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function LiveDot({ tone = "neon" }: { tone?: "neon" | "warning" | "critical" }) {
  const c =
    tone === "warning"
      ? "bg-status-warning"
      : tone === "critical"
        ? "bg-status-critical"
        : "bg-accent-neon";
  return (
    <span className="relative inline-flex w-2.5 h-2.5">
      <span className={`absolute inset-0 ${c} rounded-full animate-pulse-neon`} />
      <span className={`absolute inset-0 ${c} rounded-full`} />
    </span>
  );
}

export function SocBar({
  start,
  end,
  className = "",
}: {
  start: number;
  end: number;
  className?: string;
}) {
  const tone = (v: number) =>
    v < 15 ? "bg-status-critical" : v < 40 ? "bg-status-warning" : "bg-accent-neon";
  return (
    <div className={`w-full ${className}`}>
      <div className="h-2 rounded-full bg-bg-elevated overflow-hidden flex">
        <div
          className={`${tone(start)} transition-all`}
          style={{ width: `${start}%`, opacity: 0.55 }}
        />
        <div className="w-px bg-bg-base" />
        <div className={`${tone(end)} transition-all`} style={{ width: `${100 - start}%` }}>
          <div
            className="h-full bg-bg-base/80"
            style={{ marginLeft: `${((end - start + (100 - start)) / (100 - start)) * 100 - 100 + 100}%` }}
          />
        </div>
      </div>
      <div className="flex justify-between mt-1.5 text-cap text-ink-secondary tabular">
        <span>Start {start}%</span>
        <span>End {end}%</span>
      </div>
    </div>
  );
}

export function SegBar({
  start,
  end,
}: {
  start: number;
  end: number;
}) {
  const tone = (v: number) =>
    v < 15 ? "bg-status-critical" : v < 40 ? "bg-status-warning" : "bg-accent-neon";
  return (
    <div className="w-full h-2 rounded-full bg-bg-elevated relative">
      <div
        className={`absolute top-0 bottom-0 ${tone(Math.min(start, end))} rounded-full`}
        style={{
          left: `${Math.min(start, end)}%`,
          width: `${Math.abs(end - start)}%`,
          opacity: 0.4,
        }}
      />
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-bg-base ${tone(start)}`}
        style={{ left: `calc(${start}% - 6px)` }}
      />
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-bg-base ${tone(end)}`}
        style={{ left: `calc(${end}% - 6px)` }}
      />
    </div>
  );
}
