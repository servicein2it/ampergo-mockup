import { useState } from "react";
import { Phone } from "./components/Phone";
import { ScreenIndex } from "./screens/ScreenIndex";
import { Lang, ScreenId } from "./types";

import { F11_Splash } from "./screens/F11_Splash";
import { F12_SignIn } from "./screens/F12_SignIn";
import { F13_AddVehicle } from "./screens/F13_AddVehicle";
import { F14_VehicleConfirm } from "./screens/F14_VehicleConfirm";
import { F15_ConnectVehicle } from "./screens/F15_ConnectVehicle";
import { F16_ManualSoC } from "./screens/F16_ManualSoC";
import { F17_Permissions } from "./screens/F17_Permissions";
import { F18_FirstRun } from "./screens/F18_FirstRun";
import { F21_HomeMap } from "./screens/F21_HomeMap";
import { F22_FiltersSheet } from "./screens/F22_FiltersSheet";
import { F23_Search } from "./screens/F23_Search";
import { F24_StationDetail } from "./screens/F24_StationDetail";
import { F25_Handoff } from "./screens/F25_Handoff";
import { F31_Destination } from "./screens/F31_Destination";
import { F32_RoutePreview } from "./screens/F32_RoutePreview";
import { F33_TripPlan } from "./screens/F33_TripPlan";
import { F34_StopDetail } from "./screens/F34_StopDetail";
import { F35_LiveNav } from "./screens/F35_LiveNav";
import { F36_Recalc } from "./screens/F36_Recalc";
import { F41_P2PMap } from "./screens/F41_P2PMap";
import { F42_P2PDetail } from "./screens/F42_P2PDetail";
import { F43_P2PBooking } from "./screens/F43_P2PBooking";
import { F44_ActiveSession } from "./screens/F44_ActiveSession";
import { F45_Rating } from "./screens/F45_Rating";
import { F46_BecomeHost } from "./screens/F46_BecomeHost";
import { F47_RegisterCharger } from "./screens/F47_RegisterCharger";
import { F48_HostDashboard } from "./screens/F48_HostDashboard";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [screen, setScreen] = useState<ScreenId>("F1.1");
  const [lang, setLang] = useState<Lang>("EN");

  const go = (s: ScreenId) => setScreen(s);

  const screenEl = renderScreen(screen, { lang, setLang, go });

  return (
    <Phone
      side={
        <div className="hidden md:block">
          <ScreenIndex current={screen} onPick={setScreen} lang={lang} setLang={setLang} />
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          className="absolute inset-0 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {screenEl}
        </motion.div>
      </AnimatePresence>
    </Phone>
  );
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; go: (s: ScreenId) => void };

function renderScreen(s: ScreenId, ctx: Ctx) {
  switch (s) {
    case "F1.1": return <F11_Splash {...ctx} />;
    case "F1.2": return <F12_SignIn {...ctx} />;
    case "F1.3": return <F13_AddVehicle {...ctx} />;
    case "F1.4": return <F14_VehicleConfirm {...ctx} />;
    case "F1.5": return <F15_ConnectVehicle {...ctx} />;
    case "F1.6": return <F16_ManualSoC {...ctx} />;
    case "F1.7": return <F17_Permissions {...ctx} />;
    case "F1.8":
      return (
        <div className="flex-1 relative">
          <F21_HomeMap {...ctx} />
          <F18_FirstRun go={ctx.go} />
        </div>
      );
    case "F2.1": return <F21_HomeMap {...ctx} />;
    case "F2.2":
      return (
        <div className="flex-1 relative">
          <F21_HomeMap {...ctx} />
          <F22_FiltersSheet go={ctx.go} />
        </div>
      );
    case "F2.3": return <F23_Search {...ctx} />;
    case "F2.4":
      return (
        <div className="flex-1 relative">
          <F21_HomeMap {...ctx} />
          <F24_StationDetail go={ctx.go} />
        </div>
      );
    case "F2.5":
      return (
        <div className="flex-1 relative">
          <F24_StationDetail go={() => {}} />
          <F25_Handoff go={ctx.go} />
        </div>
      );
    case "F3.1": return <F31_Destination {...ctx} />;
    case "F3.2": return <F32_RoutePreview {...ctx} />;
    case "F3.3": return <F33_TripPlan {...ctx} />;
    case "F3.4": return <F34_StopDetail go={ctx.go} />;
    case "F3.5": return <F35_LiveNav go={ctx.go} />;
    case "F3.6":
      return (
        <div className="flex-1 relative">
          <F35_LiveNav go={() => {}} />
          <F36_Recalc go={ctx.go} />
        </div>
      );
    case "F4.1": return <F41_P2PMap {...ctx} />;
    case "F4.2":
      return (
        <div className="flex-1 relative">
          <F41_P2PMap {...ctx} />
          <F42_P2PDetail go={ctx.go} />
        </div>
      );
    case "F4.3": return <F43_P2PBooking go={ctx.go} />;
    case "F4.4": return <F44_ActiveSession go={ctx.go} />;
    case "F4.5": return <F45_Rating go={ctx.go} />;
    case "F4.6": return <F46_BecomeHost go={ctx.go} />;
    case "F4.7": return <F47_RegisterCharger go={ctx.go} />;
    case "F4.8": return <F48_HostDashboard go={ctx.go} />;
    default: return null;
  }
}
