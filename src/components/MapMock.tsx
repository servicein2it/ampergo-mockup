import { motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";

export type Pin = {
  id: string;
  x: number;
  y: number;
  color: string;
  label?: string;
  kind?: "cpo" | "p2p" | "user" | "stop";
  pulse?: boolean;
  number?: number;
};

export function MapMock({
  pins = [],
  showRouteRing = true,
  routePath,
  showRoute = false,
  rangeKm,
  children,
  className = "",
  centeredUser = true,
  style,
}: {
  pins?: Pin[];
  showRouteRing?: boolean;
  routePath?: { from: { x: number; y: number }; to: { x: number; y: number }; via?: { x: number; y: number }[] };
  showRoute?: boolean;
  rangeKm?: number;
  children?: ReactNode;
  className?: string;
  centeredUser?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`absolute inset-0 map-bg overflow-hidden ${className}`}
      style={style}
    >
      {/* Grid streets — stylized */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="streets" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 6 H12 M6 0 V12" stroke="rgba(154,165,177,0.06)" strokeWidth="0.4" />
          </pattern>
          <radialGradient id="userGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,230,118,0.55)" />
            <stop offset="100%" stopColor="rgba(0,230,118,0)" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#streets)" />
        {/* Major arteries */}
        <path
          d="M-5 28 Q 30 24, 60 32 T 110 30"
          stroke="rgba(0,212,255,0.18)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M22 -5 Q 24 30, 48 60 T 70 110"
          stroke="rgba(0,212,255,0.16)"
          strokeWidth="1.0"
          fill="none"
        />
        <path
          d="M-5 75 Q 35 70, 60 80 T 110 78"
          stroke="rgba(0,212,255,0.14)"
          strokeWidth="0.9"
          fill="none"
        />
        <path
          d="M75 -5 Q 80 30, 78 55 T 82 110"
          stroke="rgba(0,212,255,0.14)"
          strokeWidth="0.8"
          fill="none"
        />
        {/* Water/parks */}
        <ellipse cx="20" cy="55" rx="9" ry="6" fill="rgba(0,212,255,0.05)" />
        <ellipse cx="86" cy="42" rx="6" ry="5" fill="rgba(0,230,118,0.04)" />

        {showRouteRing && centeredUser && (
          <>
            <circle
              cx="50"
              cy="55"
              r="22"
              stroke="rgba(0,230,118,0.5)"
              strokeWidth="0.4"
              fill="none"
              strokeDasharray="1.2 1.2"
            />
            <circle cx="50" cy="55" r="22" fill="rgba(0,230,118,0.05)" />
          </>
        )}

        {showRoute && routePath && (
          <>
            <path
              d={routeD(routePath)}
              stroke="rgba(0,212,255,0.95)"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={routeD(routePath)}
              stroke="rgba(0,212,255,0.25)"
              strokeWidth="3.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>

      {/* User location glow */}
      {centeredUser && (
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "55%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full bg-accent-neon/30 animate-pulse-neon" />
            <div className="w-4 h-4 rounded-full bg-accent-neon border-2 border-bg-base shadow-neon" />
          </div>
        </div>
      )}

      {/* Pins */}
      {pins.map((pin) => (
        <PinComp key={pin.id} pin={pin} />
      ))}

      {rangeKm && (
        <div className="absolute left-2 bottom-24 text-cap text-ink-secondary bg-bg-elevated/80 border border-border-subtle px-2 py-1 rounded-full backdrop-blur tabular">
          ~{rangeKm} km range
        </div>
      )}

      {children}
    </div>
  );
}

function routeD(p: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  via?: { x: number; y: number }[];
}) {
  const pts = [p.from, ...(p.via ?? []), p.to];
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const cx = (prev.x + cur.x) / 2;
    const cy = (prev.y + cur.y) / 2 - 4;
    d += ` Q ${cx} ${cy}, ${cur.x} ${cur.y}`;
  }
  return d;
}

function PinComp({ pin }: { pin: Pin }) {
  const isP2P = pin.kind === "p2p";
  const isStop = pin.kind === "stop";
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className="absolute"
      style={{
        left: `${pin.x}%`,
        top: `${pin.y}%`,
        transform: "translate(-50%, -100%)",
      }}
    >
      {isStop ? (
        <div className="flex flex-col items-center -mb-1">
          <div
            className="w-7 h-7 rounded-full border-2 border-bg-base flex items-center justify-center text-cap font-bold tabular shadow-neon"
            style={{ background: "#00E676", color: "#0A0E14" }}
          >
            {pin.number}
          </div>
        </div>
      ) : isP2P ? (
        <Star color={pin.color} pulse={pin.pulse} />
      ) : (
        <Teardrop color={pin.color} pulse={pin.pulse} />
      )}
    </motion.div>
  );
}

function Teardrop({ color, pulse }: { color: string; pulse?: boolean }) {
  return (
    <div className="relative">
      {pulse && (
        <span
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full animate-pulse-neon"
          style={{ background: color }}
        />
      )}
      <svg width="26" height="32" viewBox="0 0 26 32">
        <path
          d="M13 0 C5.8 0 0 5.8 0 13 C0 22 13 32 13 32 S26 22 26 13 C26 5.8 20.2 0 13 0 Z"
          fill={color}
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="0.5"
        />
        <circle cx="13" cy="13" r="5" fill="#ffffff" />
      </svg>
    </div>
  );
}

function Star({ color, pulse }: { color: string; pulse?: boolean }) {
  return (
    <div className="relative">
      {pulse && (
        <span
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full animate-pulse-neon"
          style={{ background: color }}
        />
      )}
      <svg width="28" height="28" viewBox="0 0 28 28">
        <polygon
          points="14,1 17.5,9.6 27,10.4 19.5,16.5 22,26 14,20.7 6,26 8.5,16.5 1,10.4 10.5,9.6"
          fill={color}
          stroke="#00E676"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
