import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwind from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VIT_BASE_PATH || "/Local-AI-EmailWriter",
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwind()],
});
