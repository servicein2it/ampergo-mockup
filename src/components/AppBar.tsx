import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

export function AppBar({
  title,
  onBack,
  right,
  variant = "default",
}: {
  title?: string;
  onBack?: () => void;
  right?: ReactNode;
  variant?: "default" | "transparent";
}) {
  const bg = variant === "transparent" ? "bg-transparent" : "bg-bg-base";
  return (
    <div className={`${bg} h-14 px-3 flex items-center gap-2 shrink-0 z-20`}>
      {onBack ? (
        <button
          onClick={onBack}
          className="w-10 h-10 inline-flex items-center justify-center rounded-full hover:bg-white/5 -ml-1"
          aria-label="Back"
        >
          <ChevronLeft size={24} />
        </button>
      ) : (
        <div className="w-2" />
      )}
      <div className="flex-1 text-t1 truncate">{title}</div>
      <div className="flex items-center gap-1">{right}</div>
    </div>
  );
}
