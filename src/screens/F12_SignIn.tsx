import { Mail } from "lucide-react";
import { LangToggle } from "../components/LangToggle";
import { BoltMark } from "../components/Logo";
import { Button, Divider } from "../components/UI";
import { t } from "../i18n";
import { Lang, ScreenId } from "../types";

export function F12_SignIn({
  lang,
  setLang,
  go,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  go: (s: ScreenId) => void;
}) {
  return (
    <div className="flex-1 flex flex-col bg-bg-base">
      <div className="h-14 px-3 flex items-center justify-end">
        <LangToggle value={lang} onChange={setLang} />
      </div>
      <div className="flex-1 phone-scroll px-gutter pb-6">
        <div className="pt-6">
          <BoltMark size={48} />
          <h1 className={`mt-4 text-t1 ${lang === "TH" ? "font-thai" : ""}`}>
            {t("signinHead", lang)}
          </h1>
          <p
            className={`mt-2 text-bodysm text-ink-secondary ${lang === "TH" ? "font-thai" : ""}`}
          >
            {t("signinSub", lang)}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => go("F1.3")}
            className="h-14 rounded-btn font-semibold text-white"
            style={{ background: "#06C755" }}
          >
            {t("continueLine", lang)}
          </button>
          <button
            onClick={() => go("F1.3")}
            className="h-14 rounded-btn font-semibold bg-black text-white border border-white/15"
          >
             {t("continueApple", lang)}
          </button>
          <button
            onClick={() => go("F1.3")}
            className="h-14 rounded-btn font-semibold bg-bg-surface text-ink-primary border border-border-subtle"
          >
            <span className="inline-flex items-center gap-2">
              <GoogleG />
              {t("continueGoogle", lang)}
            </span>
          </button>
        </div>

        <Divider label="or" />

        <Button variant="tertiary" onClick={() => go("F1.3")}>
          <span className="inline-flex items-center gap-2">
            <Mail size={18} />
            {t("continueEmail", lang)}
          </span>
        </Button>

        <div className="mt-8 text-center">
          <button
            onClick={() => go("F1.7")}
            className="text-bodysm text-ink-secondary"
          >
            {t("skip", lang)}
          </button>
          <p
            className={`mt-3 text-cap text-ink-disabled px-6 leading-relaxed ${lang === "TH" ? "font-thai" : ""}`}
          >
            {t("termsLine", lang)}
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.6 9.2c0-.6-.1-1.2-.2-1.7H9v3.4h4.8c-.2 1.1-.8 2-1.7 2.6v2.2h2.8c1.6-1.5 2.7-3.7 2.7-6.5z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.4 0 4.5-.8 6-2.2l-2.8-2.2c-.8.5-1.8.9-3.2.9-2.5 0-4.6-1.7-5.4-3.9H.7v2.4C2.2 15.9 5.3 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.6 10.6C3.4 10.1 3.3 9.6 3.3 9s.1-1.1.3-1.6V5H.7C.2 6.2 0 7.6 0 9s.3 2.8.7 4l2.9-2.4z"
      />
      <path
        fill="#EA4335"
        d="M9 3.6c1.4 0 2.6.5 3.6 1.4l2.7-2.7C13.5.9 11.5 0 9 0 5.3 0 2.2 2.1.7 5l2.9 2.4C4.4 5.3 6.5 3.6 9 3.6z"
      />
    </svg>
  );
}
