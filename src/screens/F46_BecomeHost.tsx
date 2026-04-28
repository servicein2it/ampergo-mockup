import { Banknote, Settings2, Shield } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { Button, Card, Pill } from "../components/UI";
import { ScreenId } from "../types";

export function F46_BecomeHost({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <AppBar title="" onBack={() => go("F4.1")} />
      <div className="flex-1 phone-scroll">
        <div className="h-[180px] relative bg-gradient-to-br from-bg-elevated via-bg-base to-accent-neon/10 flex items-center justify-center overflow-hidden">
          <Townhouse />
          <div className="absolute top-4 left-4">
            <Pill tone="neon">Earn passive income</Pill>
          </div>
        </div>
        <div className="px-gutter pt-5 pb-6">
          <h1 className="text-t1">Earn from your wallbox.</h1>
          <p className="text-bodysm text-ink-secondary mt-2">
            Your home charger sits idle most of the day. Put it to work, set your own price, and earn passive income.
          </p>

          <div className="space-y-3 mt-5">
            <ValueCard
              icon={<Settings2 size={20} className="text-accent-neon" />}
              title="You set the rules."
              body="Hours, pricing, who can book."
            />
            <ValueCard
              icon={<Banknote size={20} className="text-accent-neon" />}
              title="We handle payments."
              body="Direct deposit to PromptPay or your bank within 48 hours."
            />
            <ValueCard
              icon={<Shield size={20} className="text-accent-neon" />}
              title="You're insured."
              body="Optional damage coverage included with every session."
            />
          </div>

          <Card className="mt-5 !p-4 text-center">
            <div className="text-cap text-ink-secondary uppercase tracking-wide">Earnings preview</div>
            <div className="font-mono text-display tabular mt-1 text-accent-neon">≈ 6,000 THB / mo</div>
            <div className="text-cap text-ink-secondary mt-1">Estimated for 15 sessions/month at 12 kWh average</div>
            <button className="mt-3 text-bodysm text-accent-neon">How is this calculated?</button>
          </Card>
        </div>
      </div>
      <div className="px-gutter pb-6 pt-3 border-t border-border-subtle space-y-2">
        <Button onClick={() => go("F4.7")}>Get started</Button>
        <Button variant="tertiary" onClick={() => go("F4.1")}>Maybe later</Button>
      </div>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-accent-neon/15 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <div className="text-body font-semibold">{title}</div>
          <div className="text-bodysm text-ink-secondary">{body}</div>
        </div>
      </div>
    </Card>
  );
}

function Townhouse() {
  return (
    <svg width="240" height="160" viewBox="0 0 240 160">
      <defs>
        <linearGradient id="hgrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1c2430" />
          <stop offset="100%" stopColor="#0a0e14" />
        </linearGradient>
      </defs>
      <rect x="60" y="50" width="120" height="90" fill="url(#hgrad)" stroke="#222b38" />
      <polygon points="55,50 120,15 185,50" fill="#1c2430" stroke="#222b38" />
      <rect x="80" y="80" width="20" height="40" fill="#0a0e14" stroke="#222b38" />
      <rect x="115" y="65" width="20" height="20" fill="#00D4FF" opacity="0.3" stroke="#00D4FF" />
      <rect x="150" y="65" width="20" height="20" fill="#00D4FF" opacity="0.3" stroke="#00D4FF" />
      <rect x="155" y="100" width="14" height="22" rx="2" fill="#0a0e14" stroke="#00E676" />
      <circle cx="162" cy="111" r="3" fill="#00E676" />
      <line x1="190" y1="120" x2="220" y2="120" stroke="#00E676" strokeWidth="2" strokeDasharray="3 2" />
      <circle cx="225" cy="120" r="6" fill="#00E676" opacity="0.3" />
      <circle cx="225" cy="120" r="3" fill="#00E676" />
    </svg>
  );
}
