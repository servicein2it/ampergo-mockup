import { Bell, Bluetooth, Check, MapPin } from "lucide-react";
import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { Button, Card } from "../components/UI";
import { t } from "../i18n";
import { Lang, ScreenId } from "../types";

type State = "pending" | "allowed" | "denied";

export function F17_Permissions({
  lang,
  go,
}: {
  lang: Lang;
  go: (s: ScreenId) => void;
}) {
  const [loc, setLoc] = useState<State>("pending");
  const [notif, setNotif] = useState<State>("pending");
  const [bt, setBt] = useState<State>("pending");

  const canSkip = loc !== "pending";
  const allDecided = loc !== "pending" && notif !== "pending" && bt !== "pending";

  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <AppBar title={t("permsTitle", lang)} />
      <div className="flex-1 phone-scroll px-gutter pb-6 space-y-3">
        <PermCard
          icon={<MapPin size={28} className="text-accent-neon" />}
          title={t("permLoc", lang)}
          body={t("permLocBody", lang)}
          state={loc}
          onAllow={() => setLoc("allowed")}
          onDeny={() => setLoc("denied")}
          required
        />
        <PermCard
          icon={<Bell size={28} className="text-accent-neon" />}
          title={t("permNotif", lang)}
          body={t("permNotifBody", lang)}
          state={notif}
          onAllow={() => setNotif("allowed")}
          onDeny={() => setNotif("denied")}
          variant="secondary"
        />
        <PermCard
          icon={<Bluetooth size={28} className="text-accent-neon" />}
          title={t("permBT", lang)}
          body={t("permBTBody", lang)}
          state={bt}
          onAllow={() => setBt("allowed")}
          onDeny={() => setBt("denied")}
          variant="tertiary"
        />

        <div className="pt-2 text-center">
          <button
            disabled={!canSkip}
            onClick={() => go("F1.8")}
            className={`text-bodysm py-3 ${
              canSkip ? "text-accent-neon" : "text-ink-disabled"
            }`}
          >
            Skip optional permissions
          </button>
        </div>

        {allDecided && (
          <div className="pt-2">
            <Button onClick={() => go("F1.8")}>Continue</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function PermCard({
  icon,
  title,
  body,
  state,
  onAllow,
  onDeny,
  variant = "primary",
  required,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  state: State;
  onAllow: () => void;
  onDeny: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  required?: boolean;
}) {
  if (state !== "pending") {
    return (
      <Card>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-bg-elevated flex items-center justify-center">
            {state === "allowed" ? (
              <Check size={18} className="text-accent-neon" />
            ) : (
              <span className="text-status-warning text-cap font-bold">!</span>
            )}
          </div>
          <div className="flex-1">
            <div className="text-body">{title}</div>
            <div className={`text-cap ${state === "allowed" ? "text-accent-neon" : "text-status-warning"}`}>
              {state === "allowed" ? "Allowed" : "Denied — change in Settings"}
            </div>
          </div>
        </div>
      </Card>
    );
  }
  return (
    <Card>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-accent-neon/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1 pt-0.5">
          <div className="text-t2">{title}</div>
          <div className="text-bodysm text-ink-secondary mt-1">{body}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant={variant} onClick={onAllow}>
          {required ? "Allow location" : variant === "secondary" ? "Allow notifications" : "Allow Bluetooth"}
        </Button>
      </div>
      {!required && (
        <button
          onClick={onDeny}
          className="w-full text-cap text-ink-secondary mt-2 py-2"
        >
          Not now
        </button>
      )}
    </Card>
  );
}
