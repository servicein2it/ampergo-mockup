import { ChevronRight, Plus, Star } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { Button, Card, Pill } from "../components/UI";
import { TabBar } from "../components/TabBar";
import { HOST_DASHBOARD } from "../data/demo";
import { ScreenId } from "../types";

export function F48_HostDashboard({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <AppBar title="Host" />
      <div className="flex-1 phone-scroll px-gutter pb-6">
        <Card className="!p-4">
          <div className="text-cap text-ink-secondary uppercase tracking-wide">This month's earnings</div>
          <div className="font-mono text-display tabular text-accent-neon mt-1">
            {HOST_DASHBOARD.earningsThisMonth.toLocaleString()} THB
          </div>
          <button className="text-bodysm text-accent-neon mt-1">View all payouts →</button>
        </Card>

        <div className="grid grid-cols-4 gap-2 mt-3">
          <KPI value={`${HOST_DASHBOARD.sessionsCount}`} label="Sessions" />
          <KPI value={`${HOST_DASHBOARD.avgValue}`} label="Avg value" />
          <KPI value={`${HOST_DASHBOARD.rating}`} label="Rating" icon={<Star size={10} fill="currentColor" />} />
          <KPI value={`${HOST_DASHBOARD.utilization}%`} label="Utilization" />
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="text-t2">Upcoming bookings</div>
            <button className="text-bodysm text-ink-secondary">See all</button>
          </div>
          <div className="mt-2 space-y-2">
            {HOST_DASHBOARD.upcoming.map((b) => (
              <button
                key={b.when}
                className="w-full bg-bg-surface border border-border-subtle rounded-card p-3 flex items-center text-left active:opacity-80"
              >
                <div className="flex-1">
                  <div className="text-body">{b.when}</div>
                  <div className="text-cap text-ink-secondary">{b.driver} · {b.target}</div>
                </div>
                <Pill tone="neon">{b.status}</Pill>
                <ChevronRight size={18} className="text-ink-secondary ml-2" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="text-t2">My listings</div>
            <button className="text-bodysm text-accent-neon">+ Add</button>
          </div>
          <Card className="mt-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-body">Boon's Wallbox</div>
                <div className="text-cap text-ink-secondary tabular">22 kW · 9 THB/kWh · 4.8 ★</div>
              </div>
              <div className="flex bg-bg-elevated rounded-full p-1">
                <div className="px-3 h-7 rounded-full bg-accent-neon text-bg-base text-cap font-semibold flex items-center">Active</div>
                <button className="px-3 h-7 rounded-full text-cap text-ink-secondary">Pause</button>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-5">
          <div className="text-t2 mb-2">Insights · last 7 days</div>
          <Card className="!p-3">
            <div className="grid grid-rows-7 gap-1" style={{ gridTemplateColumns: "auto repeat(24, 1fr)" }}>
              {Array.from({ length: 7 }).map((_, day) => (
                <>
                  <div key={`label-${day}`} className="text-cap text-ink-secondary tabular pr-1 self-center">{["M", "T", "W", "T", "F", "S", "S"][day]}</div>
                  {Array.from({ length: 24 }).map((_, hr) => {
                    const v = (Math.sin(hr * 0.5 + day) + 1) / 2;
                    return (
                      <div
                        key={`${day}-${hr}`}
                        className="aspect-square rounded-sm"
                        style={{ background: `rgba(0, 230, 118, ${0.1 + v * 0.7})` }}
                      />
                    );
                  })}
                </>
              ))}
            </div>
            <button className="mt-3 text-bodysm text-accent-neon font-semibold">Optimize my pricing →</button>
          </Card>
        </div>

        <div className="mt-5 space-y-2">
          <Button onClick={() => go("F4.7")}>
            <span className="inline-flex items-center gap-2"><Plus size={16} /> Add another charger</span>
          </Button>
          <button className="w-full text-bodysm text-ink-secondary py-2">Host help center</button>
        </div>
      </div>

      <TabBar active="profile" onNavigate={go} />
    </div>
  );
}

function KPI({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-card p-2.5 text-center">
      <div className="font-mono text-t2 tabular inline-flex items-center gap-1 justify-center text-accent-neon">
        {icon}
        {value}
      </div>
      <div className="text-cap text-ink-secondary mt-0.5">{label}</div>
    </div>
  );
}
