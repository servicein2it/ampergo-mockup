import { motion } from "framer-motion";
import { LangToggle } from "../components/LangToggle";
import { BoltMark } from "../components/Logo";
import { Lang, ScreenId } from "../types";
import { t } from "../i18n";

export function F11_Splash({
  lang,
  setLang,
  go,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  go: (s: ScreenId) => void;
}) {
  return (
    <div className="flex-1 relative bg-bg-base flex flex-col items-center justify-center px-gutter">
      <div className="absolute top-3 right-4">
        <LangToggle value={lang} onChange={setLang} />
      </div>

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="relative">
          <BoltMark size={96} />
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <div className="w-full h-full rounded-full bg-accent-neon/20" />
          </motion.div>
        </div>
        <div className="mt-3 text-display tracking-tight">AmperGo</div>
        <div className={`mt-6 text-t2 text-ink-primary text-center max-w-[300px] ${lang === "TH" ? "font-thai" : ""}`}>
          {t("tagline", lang)}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => go("F1.2")}
        className="absolute bottom-12 text-bodysm text-accent-neon font-semibold"
      >
        Tap to continue →
      </motion.button>
      <div className="absolute bottom-4 text-cap text-ink-disabled tabular">
        v1.0 · build 100
      </div>
    </div>
  );
}
