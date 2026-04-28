type Props = { size?: number; className?: string };

export function BoltMark({ size = 48, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-label="AmperGo bolt"
    >
      <defs>
        <radialGradient id="bgrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00E676" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#00E676" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#bgrad)" />
      <path
        d="M27 6 L13 27 H22 L19 42 L35 19 H26 Z"
        fill="#00E676"
        stroke="#0A0E14"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AmperGoLogo({ size = 96 }: { size?: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <BoltMark size={size} />
      <div className="text-t1 tracking-tight">AmperGo</div>
    </div>
  );
}
