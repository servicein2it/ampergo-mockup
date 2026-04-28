import { Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/UI";
import { BoltMark } from "../components/Logo";
import { USER, VEHICLE } from "../data/demo";
import { Lang, ScreenId } from "../types";

export function F15_ConnectVehicle({
  go,
}: {
  lang: Lang;
  go: (s: ScreenId) => void;
}) {
  const [stage, setStage] = useState<"intro" | "loading" | "success">("intro");

  return (
    <div className="flex-1 flex flex-col bg-black/40 relative">
      <div className="absolute inset-0 bg-bg-base/70 backdrop-blur" onClick={() => go("F1.4")} />
      <div className="absolute inset-x-0 bottom-0 bg-bg-surface rounded-t-sheet border-t border-border-subtle px-gutter pb-6 pt-3" style={{ height: "90%" }}>
        <div className="flex justify-center pb-2">
          <div className="w-9 h-1 rounded-full bg-ink-disabled" />
        </div>
        <div className="flex justify-end">
          <button
            className="w-8 h-8 rounded-full bg-bg-elevated flex items-center justify-center"
            onClick={() => go("F1.4")}
          >
            <X size={18} />
          </button>
        </div>

        {stage === "intro" && (
          <div className="pt-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <SmartcarMark />
              <div className="h-px w-10 bg-accent-neon" />
              <BoltMark size={48} />
            </div>
            <h1 className="text-t1 text-center">Connect your vehicle</h1>
            <p className="text-bodysm text-ink-secondary text-center mt-2 px-4">
              We use Smartcar to securely link to your car's manufacturer
              account. AmperGo never sees your password.
            </p>

            <ol className="mt-8 space-y-3">
              {["Choose your brand", "Sign in with your manufacturer account", "Approve battery and location permissions"].map(
                (s, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-bg-elevated border border-border-subtle text-accent-neon flex items-center justify-center text-cap font-bold tabular shrink-0">
                      {i + 1}
                    </div>
                    <div className="text-bodysm pt-1">{s}</div>
                  </li>
                ),
              )}
            </ol>
            <div className="mt-8">
              <Button onClick={() => setStage("loading")}>Continue</Button>
              <button className="w-full mt-3 text-bodysm text-ink-secondary py-2">
                Why Smartcar?
              </button>
            </div>
          </div>
        )}

        {stage === "loading" && (
          <div className="flex flex-col items-center justify-center pt-24">
            <div className="w-16 h-16 rounded-full border-4 border-accent-neon/30 border-t-accent-neon animate-spin" />
            <div className="mt-6 text-t2">Connecting to Smartcar…</div>
            <div className="text-bodysm text-ink-secondary mt-1">
              Authenticating with {VEHICLE.brand} account
            </div>
            <button
              className="mt-8 text-accent-neon font-semibold"
              onClick={() => setStage("success")}
            >
              [Demo: Simulate success]
            </button>
          </div>
        )}

        {stage === "success" && (
          <div className="pt-6">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-accent-neon/15 border border-accent-neon flex items-center justify-center shadow-neon">
                <Check size={42} className="text-accent-neon" />
              </div>
              <div className="mt-5 text-t1">Connected — {VEHICLE.brand} {VEHICLE.model}</div>
              <div className="mt-1 text-bodysm text-ink-secondary">Live data is now flowing</div>
            </div>

            <div className="mt-8 bg-bg-elevated rounded-card p-4 border border-border-subtle">
              <div className="flex items-baseline gap-2">
                <div className="font-mono text-display tabular text-accent-neon">
                  {USER.soc}%
                </div>
                <div className="text-bodysm text-ink-secondary">battery</div>
              </div>
              <div className="text-bodysm text-ink-secondary mt-1 tabular">
                ~{USER.rangeKm} km range
              </div>
            </div>

            <div className="mt-8">
              <Button onClick={() => go("F1.7")}>Continue to map</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SmartcarMark() {
  return (
    <div className="w-12 h-12 rounded-full bg-bg-elevated border border-border-subtle flex items-center justify-center text-bodysm font-semibold">
      sc
    </div>
  );
}
