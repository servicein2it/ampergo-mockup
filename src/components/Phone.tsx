import { ReactNode } from "react";

export function Phone({
  children,
  side,
}: {
  children: ReactNode;
  side?: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-stretch justify-center gap-6 py-6 px-4">
      <div className="md:flex md:items-center md:justify-end flex-1">
        <div
          className="relative bg-black rounded-[44px] shadow-2xl border border-white/10 mx-auto"
          style={{ width: 390, height: 844, padding: 8 }}
        >
          <div
            className="relative w-full h-full rounded-[36px] overflow-hidden bg-bg-base"
            style={{ contain: "paint" }}
          >
            {/* status bar */}
            <div className="absolute top-0 left-0 right-0 h-[44px] z-50 px-7 flex items-center justify-between text-cap text-white pointer-events-none select-none">
              <div className="font-semibold tabular">9:41</div>
              <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-[110px] h-[28px] bg-black rounded-full" />
              <div className="flex items-center gap-1.5">
                <Sig />
                <Wifi />
                <Bat />
              </div>
            </div>
            <div className="absolute inset-0 pt-[44px] flex flex-col">
              {children}
            </div>
            {/* home indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[120px] h-1 bg-white/40 rounded-full z-50 pointer-events-none" />
          </div>
        </div>
      </div>
      {side && <div className="md:flex-1 md:max-w-sm">{side}</div>}
    </div>
  );
}

function Sig() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10">
      <rect x="0" y="6" width="3" height="4" fill="white" rx="0.5" />
      <rect x="4.5" y="4" width="3" height="6" fill="white" rx="0.5" />
      <rect x="9" y="2" width="3" height="8" fill="white" rx="0.5" />
      <rect x="13.5" y="0" width="2.5" height="10" fill="white" rx="0.5" />
    </svg>
  );
}
function Wifi() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="white">
      <path d="M7 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM2.7 5.6a6 6 0 0 1 8.6 0l-1.1 1.1a4.5 4.5 0 0 0-6.4 0L2.7 5.6zM.5 3.4a9.5 9.5 0 0 1 13 0L12.4 4.5a8 8 0 0 0-10.8 0L.5 3.4z" />
    </svg>
  );
}
function Bat() {
  return (
    <svg width="24" height="11" viewBox="0 0 24 11">
      <rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="white" fill="none" />
      <rect x="2" y="2" width="17" height="7" rx="1.5" fill="white" />
      <rect x="21" y="3.5" width="2" height="4" rx="1" fill="white" />
    </svg>
  );
}
