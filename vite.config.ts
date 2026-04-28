import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const onPages = !!process.env.GITHUB_ACTIONS;

export default defineConfig({
  plugins: [react()],
  base: onPages ? "/ampergo-mockup/" : "/",
  server: { port: 5173, host: true },
});
