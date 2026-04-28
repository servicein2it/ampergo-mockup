# AmperGo — Mockup

Investor-facing mobile mockup for AmperGo, an EV navigation + charger marketplace product for Thailand. **26 screens** across 4 flows: onboarding, station map, route planning, and the P2P marketplace.

Designed as an in-browser phone-frame demo: the left side renders an iPhone 14 Pro frame containing the live app, the right side is a screen index for fast jumping between flows during a pitch.

## Stack

- Vite + React 18 + TypeScript (strict)
- Tailwind v3 with custom design tokens (dark-first, neon `#00E676` accent)
- Framer Motion for transitions
- Lucide icons
- No backend — fully static, all data is mocked

## Run locally

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deploy

The repo deploys cleanly to Vercel, Netlify, or Cloudflare Pages — Vite is auto-detected, no config required.

## Demo path

The most common 2-minute pitch path:

`F1.1 Splash → F1.2 Sign-in → F1.4 Vehicle Confirm → F2.1 Home Map → F2.4 Station Detail → F2.5 Handoff → F3.1 Route → F3.2 Outcome → F3.3 Trip Plan → F3.5 Live Nav → F3.6 Recalc → F4.1 P2P Map → F4.2 P2P Listing → F4.3 P2P Booking → F4.8 Host Dashboard`

The right-side screen index highlights this path as quick-jump pills.

## Notes

- Map is a stylized SVG, not Mapbox — keeps the demo offline-capable and free.
- EN / TH language toggle works across primary copy.
- Demo data: Poii driving a BYD ATTO 3 (87% live SoC) on a 700 km Bangkok → Chiang Mai trip with 3 charging stops; Boon's Wallbox in Sukhumvit 24 as the P2P showcase.
