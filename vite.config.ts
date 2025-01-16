import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Expose to external network (e.g., Docker host)
    port: 5173, // Match the port in your Dockerfile and EXPOSE directive
    strictPort: true, // Ensures the app fails if the port is unavailable
  },
});
