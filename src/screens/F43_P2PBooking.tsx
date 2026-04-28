import { CreditCard, Wallet } from "lucide-react";
import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { Button, Card, Pill } from "../components/UI";
import { ScreenId } from "../types";

const DAYS = ["Today", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

export function F43_P2PBooking({ go }: { go: (s: ScreenId) => void }) {
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>("16:00");
  const [target, setTarget] = useState<"+30%" | "+50%" | "Until full" | "Custom">("+50%");
  const [pay, setPay] = useState<"card" | "promptpay" | "wallet">("promptpay");
  const [confirmed, setConfirmed] = useState(false);

  const estKwh = target === "+30%" ? 18 : target === "+50%" ? 30 : 45;
  const charging = estKwh * 9;
  const total = charging + 10;

  if (confirmed) {
    return <Confirmation go={go} total={total} />;
  }

  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <AppBar title="Book Charger" onBack={() => go("F4.2")} />
      <div className="flex-1 phone-scroll px-gutter pb-6 space-y-4">
        <div>
          <div className="text-cap text-ink-secondary uppercase tracking-wide mb-2">Choose a time slot</div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {DAYS.map((d, i) => (
              <button
                key={d}
                onClick={() => setDay(i)}
                className={`shrink-0 w-14 h-16 rounded-btn border ${
                  i === day ? "bg-accent-neon text-bg-base border-accent-neon font-semibold" : "bg-bg-surface border-border-subtle text-ink-secondary"
                } flex flex-col items-center justify-center`}
              >
                <span className="text-cap">{d}</span>
                <span className="text-t2 tabular leading-none mt-0.5">{28 + i}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-1.5 mt-3">
            {HOURS.map((h, i) => {
              const booked = i % 7 === 3 || i < 6 || i > 22;
              const isSelected = h === slot;
              return (
                <button
                  key={h}
                  disabled={booked}
                  onClick={() => setSlot(h)}
                  className={`h-9 rounded-btn text-cap tabular border ${
                    booked
                      ? "bg-bg-surface border-border-subtle text-ink-disabled cursor-not-allowed"
                      : isSelected
                        ? "bg-accent-neon border-accent-neon text-bg-base font-semibold"
                        : "bg-bg-surface border-border-subtle text-ink-primary"
                  }`}
                >
                  {h}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-cap text-ink-secondary uppercase tracking-wide mb-2">Charge target</div>
          <div className="flex bg-bg-surface rounded-full p-1 border border-border-subtle">
            {(["+30%", "+50%", "Until full", "Custom"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setTarget(v)}
                className={`flex-1 h-9 rounded-full text-cap font-semibold ${
                  target === v ? "bg-accent-neon text-bg-base" : "text-ink-secondary"
                }`}
              >{v}</button>
            ))}
          </div>
          <div className="text-cap text-ink-secondary tabular mt-2">
            Est. {estKwh} kWh · ~{Math.round(estKwh / 22 * 60)} min
          </div>
        </div>

        <Card>
          <div className="text-cap text-ink-secondary uppercase tracking-wide mb-2">Pricing</div>
          <PRow label={`Charging (${estKwh} kWh × 9 THB)`} value={`${charging} THB`} />
          <PRow label="Booking fee" value="10 THB" />
          <div className="border-t border-border-subtle my-2" />
          <PRow label="Total estimate" value={`${total} THB`} bold />
          <p className="mt-2 text-cap text-ink-secondary">
            Final charge based on actual kWh dispensed. Payment is pre-authorized for {Math.round(total * 1.2)} THB; we'll capture the exact amount after the session.
          </p>
        </Card>

        <div>
          <div className="text-cap text-ink-secondary uppercase tracking-wide mb-2">Payment method</div>
          <div className="space-y-2">
            <PayRow icon={<CreditCard size={18} />} label="Card ending 4242" active={pay === "card"} onClick={() => setPay("card")} />
            <PayRow icon={<PPLogo />} label="PromptPay" active={pay === "promptpay"} onClick={() => setPay("promptpay")} />
            <PayRow icon={<Wallet size={18} />} label="AmperGo wallet · 1,250 THB" active={pay === "wallet"} onClick={() => setPay("wallet")} />
          </div>
        </div>
      </div>

      <div className="px-gutter pb-6 pt-3 border-t border-border-subtle">
        <Button onClick={() => setConfirmed(true)}>Confirm booking · {total} THB est.</Button>
      </div>
    </div>
  );
}

function PRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "text-body" : "text-bodysm"}`}>
      <span className={bold ? "" : "text-ink-secondary"}>{label}</span>
      <span className={`font-mono tabular ${bold ? "text-accent-neon font-semibold" : ""}`}>{value}</span>
    </div>
  );
}

function PayRow({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-12 rounded-btn px-3 flex items-center gap-3 border ${active ? "border-accent-neon bg-accent-neon/5" : "border-border-subtle bg-bg-surface"}`}
    >
      <span className={active ? "text-accent-neon" : "text-ink-secondary"}>{icon}</span>
      <span className="text-bodysm flex-1 text-left">{label}</span>
      {active && <span className="w-4 h-4 rounded-full bg-accent-neon" />}
    </button>
  );
}

function PPLogo() {
  return (
    <div className="w-[18px] h-[18px] rounded-sm bg-accent-cyan/30 border border-accent-cyan flex items-center justify-center text-[8px] font-bold text-accent-cyan">PP</div>
  );
}

function Confirmation({ go, total }: { go: (s: ScreenId) => void; total: number }) {
  return (
    <div className="flex-1 flex flex-col bg-bg-base px-gutter pt-12 pb-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-accent-neon/15 border border-accent-neon flex items-center justify-center shadow-neon">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M14 30 L26 42 L46 18" stroke="#00E676" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-t1 mt-4">Booked — Today, 16:00</div>
        <div className="text-bodysm text-ink-secondary mt-1">Boon's Wallbox · Sukhumvit 24</div>
        <Pill tone="neon" className="mt-3">Pre-auth: {Math.round(total * 1.2)} THB</Pill>
      </div>

      <div className="bg-bg-surface rounded-card p-4 border border-border-subtle mt-6">
        <div className="text-cap text-ink-secondary uppercase tracking-wide">Address</div>
        <div className="text-body mt-1">123 Sukhumvit 24, Bangkok</div>
      </div>

      <div className="mt-auto space-y-2">
        <Button onClick={() => go("F3.3")}>Add to plan</Button>
        <Button variant="secondary" onClick={() => go("F4.4")}>View booking</Button>
      </div>
    </div>
  );
}
