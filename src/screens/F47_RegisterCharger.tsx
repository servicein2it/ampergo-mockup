import { Camera, MapPin, X } from "lucide-react";
import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { Button, Card, Chip, Input } from "../components/UI";
import { ScreenId } from "../types";

const STEPS = [
  "Charger basics",
  "Power & connector",
  "Photos",
  "Address & access",
  "Schedule",
  "Pricing & payout",
];

export function F47_RegisterCharger({ go }: { go: (s: ScreenId) => void }) {
  const [step, setStep] = useState(0);

  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <AppBar
        title={STEPS[step]}
        onBack={() => (step === 0 ? go("F4.6") : setStep(step - 1))}
        right={
          <button onClick={() => go("F4.1")} className="w-10 h-10 flex items-center justify-center">
            <X size={20} />
          </button>
        }
      />

      <div className="px-gutter pt-1 pb-2">
        <div className="text-cap text-ink-secondary tabular">
          Step {step + 1} of {STEPS.length}
        </div>
        <div className="h-1 bg-bg-elevated rounded-full mt-2">
          <div
            className="h-full bg-accent-neon rounded-full transition-all"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 phone-scroll px-gutter py-4">
        {step === 0 && <StepBasics />}
        {step === 1 && <StepPower />}
        {step === 2 && <StepPhotos />}
        {step === 3 && <StepAddress />}
        {step === 4 && <StepSchedule />}
        {step === 5 && <StepPricing />}
      </div>

      <div className="px-gutter pb-6 pt-3 border-t border-border-subtle flex gap-3">
        <Button variant="secondary" full={false} className="flex-1">Save draft</Button>
        <Button
          full={false}
          className="flex-1"
          onClick={() => {
            if (step < STEPS.length - 1) setStep(step + 1);
            else go("F4.8");
          }}
        >
          {step === STEPS.length - 1 ? "Submit for review" : "Continue"}
        </Button>
      </div>
    </div>
  );
}

function StepBasics() {
  return (
    <div className="space-y-3">
      <p className="text-bodysm text-ink-secondary">Tell us about the charger you want to list.</p>
      <Input placeholder="Search brand or model" />
      {["Schneider EVlink Home", "Wallbox Pulsar Plus", "ABB Terra AC", "Tesla Wall Connector", "EVBox Elvi"].map((b) => (
        <button key={b} className="w-full bg-bg-surface border border-border-subtle rounded-card p-3 flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-md bg-bg-elevated" />
          <div>
            <div className="text-body">{b}</div>
            <div className="text-cap text-ink-secondary">2024 model</div>
          </div>
        </button>
      ))}
    </div>
  );
}

function StepPower() {
  const [power, setPower] = useState("22");
  const [conn, setConn] = useState<string[]>(["Type 2"]);
  return (
    <div className="space-y-5">
      <div>
        <div className="text-bodysm text-ink-secondary mb-2">Power</div>
        <div className="flex bg-bg-surface rounded-full p-1 border border-border-subtle">
          {["7", "11", "22", "Custom"].map((v) => (
            <button
              key={v}
              onClick={() => setPower(v)}
              className={`flex-1 h-9 rounded-full text-bodysm font-semibold ${
                power === v ? "bg-accent-neon text-bg-base" : "text-ink-secondary"
              }`}
            >
              {v === "Custom" ? "Custom" : `${v} kW`}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-bodysm text-ink-secondary mb-2">Connector</div>
        <div className="flex flex-wrap gap-2">
          {["Type 2", "CCS2"].map((c) => (
            <Chip
              key={c}
              active={conn.includes(c)}
              onClick={() => setConn((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]))}
            >
              {c}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepPhotos() {
  return (
    <div>
      <p className="text-bodysm text-ink-secondary mb-3">
        Upload 3–6 photos. Drivers will see these before booking.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-card border-2 border-dashed border-border-subtle flex items-center justify-center text-ink-secondary ${
              i < 3 ? "bg-bg-surface border-solid" : ""
            }`}
          >
            {i < 3 ? (
              <span className="text-cap">{["Wallbox", "Parking", "Gate"][i]}</span>
            ) : (
              <Camera size={20} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepAddress() {
  return (
    <div className="space-y-4">
      <Input placeholder="123 Sukhumvit 24, Bangkok" icon={<MapPin size={18} />} />
      <Card className="!p-0 overflow-hidden h-44 relative">
        <div className="absolute inset-0 dotgrid" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-accent-neon shadow-neon" />
        </div>
        <div className="absolute bottom-2 left-2 text-cap text-ink-secondary bg-bg-elevated/80 px-2 py-1 rounded-full">
          Pin location confirmed
        </div>
      </Card>
      <textarea
        rows={3}
        placeholder='Access notes (e.g. "Ring bell at gate", "Use code 1234")'
        className="w-full bg-bg-surface border border-border-subtle rounded-card p-3 text-bodysm placeholder:text-ink-disabled outline-none focus:border-accent-neon"
      />
    </div>
  );
}

function StepSchedule() {
  return (
    <div>
      <p className="text-bodysm text-ink-secondary mb-3">Tap any cell to toggle availability.</p>
      <div className="overflow-x-auto no-scrollbar">
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 * 24 }).map((_, i) => {
            const day = i % 7;
            const hr = Math.floor(i / 7);
            const available = (hr >= 8 && hr <= 18) || day >= 5;
            return (
              <div
                key={i}
                className={`h-3 rounded-sm ${available ? "bg-accent-neon/70" : "bg-bg-elevated"}`}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-cap text-ink-secondary mt-2 tabular">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>
      <div className="mt-4 flex gap-2 flex-wrap">
        <Chip active>Weekdays 8–18</Chip>
        <Chip>Weekends only</Chip>
        <Chip>Always available</Chip>
      </div>
    </div>
  );
}

function StepPricing() {
  return (
    <div className="space-y-3">
      <Card>
        <div className="text-cap text-ink-secondary uppercase tracking-wide">Per-kWh price</div>
        <div className="font-mono text-display tabular text-accent-neon mt-1">9 THB/kWh</div>
        <div className="text-cap text-ink-secondary">Suggested for your area: 8–11 THB</div>
      </Card>
      <Card>
        <div className="text-cap text-ink-secondary uppercase tracking-wide">Booking fee</div>
        <div className="font-mono text-t1 tabular mt-1">10 THB</div>
      </Card>
      <Card>
        <div className="text-cap text-ink-secondary uppercase tracking-wide">Payout method</div>
        <div className="text-body mt-1">PromptPay · 081-***-1234</div>
      </Card>
    </div>
  );
}
