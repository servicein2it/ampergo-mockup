import type { Lang } from "./types";

type Dict = Record<string, { EN: string; TH: string }>;

export const STR: Dict = {
  // Splash
  tagline: {
    EN: "Smart EV navigation, every charger in Thailand.",
    TH: "นำทาง EV อัจฉริยะ ครอบคลุมทุกสถานีชาร์จในไทย",
  },
  // Sign in
  signinHead: {
    EN: "Charge anywhere in Thailand.",
    TH: "ชาร์จได้ทุกที่ทั่วประเทศไทย",
  },
  signinSub: {
    EN: "Sign in to save your vehicles, routes, and P2P bookings — or skip and explore the map first.",
    TH: "ลงชื่อเข้าใช้เพื่อบันทึกรถ เส้นทาง และการจอง P2P — หรือข้ามไปสำรวจแผนที่ก่อนก็ได้",
  },
  continueLine: { EN: "Continue with LINE", TH: "ดำเนินการต่อด้วย LINE" },
  continueApple: { EN: "Continue with Apple", TH: "ดำเนินการต่อด้วย Apple" },
  continueGoogle: { EN: "Continue with Google", TH: "ดำเนินการต่อด้วย Google" },
  continueEmail: { EN: "Continue with email", TH: "ดำเนินการต่อด้วยอีเมล" },
  skip: { EN: "Skip for now", TH: "ข้ามไปก่อน" },
  termsLine: {
    EN: "By continuing you agree to our Terms and Privacy Policy.",
    TH: "การดำเนินการต่อ คุณยอมรับข้อกำหนดและนโยบายความเป็นส่วนตัว",
  },
  // Add Vehicle
  addVehicle: { EN: "Add Vehicle", TH: "เพิ่มยานพาหนะ" },
  searchVehicle: { EN: "Search by brand or model", TH: "ค้นหาด้วยแบรนด์หรือรุ่น" },
  noModelHead: { EN: "Don't see your EV?", TH: "ไม่พบ EV ของคุณ?" },
  noModelBody: {
    EN: "We support 1,200+ models. If yours isn't here, tell us and we'll add it within 48 hours.",
    TH: "เรารองรับมากกว่า 1,200 รุ่น หากไม่พบรุ่นของคุณ แจ้งเรา เราจะเพิ่มภายใน 48 ชม.",
  },
  requestModel: { EN: "Request your model", TH: "ขอเพิ่มรุ่นของคุณ" },
  // Confirm
  confirmVehicle: { EN: "Confirm Vehicle", TH: "ยืนยันยานพาหนะ" },
  connectHead: { EN: "Connect your vehicle", TH: "เชื่อมต่อยานพาหนะ" },
  connectBody: {
    EN: "Live battery from your car. Routes recalculate every 30 seconds. Works with BYD, MG, Tesla, BMW, and 41 more brands.",
    TH: "ดูแบตเตอรี่แบบเรียลไทม์ คำนวณเส้นทางใหม่ทุก 30 วินาที รองรับ BYD, MG, Tesla, BMW และอีก 41 แบรนด์",
  },
  connectNow: { EN: "Connect now", TH: "เชื่อมต่อตอนนี้" },
  manualHead: { EN: "Enter battery manually", TH: "กรอกระดับแบตเตอรี่เอง" },
  manualBody: {
    EN: "Type your battery percentage. Works with every EV. You can switch to live data later.",
    TH: "กรอกเปอร์เซ็นต์แบตเตอรี่ ใช้ได้กับทุก EV และเปลี่ยนเป็นแบบเรียลไทม์ภายหลังได้",
  },
  manualUse: { EN: "Use manual entry", TH: "ใช้การกรอกเอง" },
  editSpecs: { EN: "Edit specs", TH: "แก้ไขสเปก" },
  recommended: { EN: "Recommended", TH: "แนะนำ" },
  // Manual SoC
  batteryLevel: { EN: "Battery Level", TH: "ระดับแบตเตอรี่" },
  saveBattery: { EN: "Save battery level", TH: "บันทึกระดับแบตเตอรี่" },
  tapAdjust: { EN: "Tap to adjust", TH: "แตะเพื่อปรับ" },
  socHelper: {
    EN: "Open your car app or look at the dashboard for the exact value.",
    TH: "เปิดแอปรถหรือดูที่หน้าปัดเพื่อดูค่าที่แม่นยำ",
  },
  // Permissions
  permsTitle: { EN: "Three quick permissions", TH: "อนุญาต 3 อย่าง" },
  permLoc: { EN: "Allow location", TH: "อนุญาตตำแหน่ง" },
  permLocBody: {
    EN: "We need your location to show nearby chargers and plan your routes.",
    TH: "เราต้องการตำแหน่งของคุณเพื่อแสดงที่ชาร์จและวางแผนเส้นทาง",
  },
  permNotif: { EN: "Allow notifications", TH: "อนุญาตการแจ้งเตือน" },
  permNotifBody: {
    EN: "Get alerts when charging is done, when a route changes, or a P2P booking is confirmed.",
    TH: "รับการแจ้งเตือนเมื่อชาร์จเสร็จ เส้นทางเปลี่ยน หรือการจอง P2P สำเร็จ",
  },
  permBT: { EN: "Allow Bluetooth", TH: "อนุญาตบลูทูธ" },
  permBTBody: {
    EN: "Some chargers and OEMs use Bluetooth to confirm your car's identity. You can change this later.",
    TH: "ที่ชาร์จและ OEM บางรายใช้บลูทูธเพื่อยืนยันรถของคุณ ปรับได้ภายหลัง",
  },
  // Map
  searchAnyPlace: { EN: "Search any place", TH: "ค้นหาสถานที่" },
  planRoute: { EN: "Plan a Route", TH: "วางแผนเส้นทาง" },
  // Route
  whereTo: { EN: "Where to?", TH: "ไปที่ไหน?" },
  currentLocation: { EN: "Current location", TH: "ตำแหน่งปัจจุบัน" },
  calcRoute: { EN: "Calculate route", TH: "คำนวณเส้นทาง" },
  startNav: { EN: "Start navigation", TH: "เริ่มนำทาง" },
  viewTripPlan: { EN: "View Trip Plan", TH: "ดูแผนการเดินทาง" },
  adjustRoute: { EN: "Adjust route", TH: "ปรับเส้นทาง" },
  // P2P
  becomeHost: { EN: "Become a host", TH: "เป็นเจ้าของชาร์จ" },
  seeAvailable: { EN: "See available times", TH: "ดูเวลาว่าง" },
  bookCharger: { EN: "Book Charger", TH: "จองที่ชาร์จ" },
  // Misc
  back: { EN: "Back", TH: "กลับ" },
  close: { EN: "Close", TH: "ปิด" },
  continue: { EN: "Continue", TH: "ดำเนินการต่อ" },
  reset: { EN: "Reset", TH: "รีเซ็ต" },
};

export function t(key: keyof typeof STR, lang: Lang) {
  return STR[key][lang];
}
