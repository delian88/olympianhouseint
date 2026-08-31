const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

module.exports = defineConfig({
  plugins: [react()],
  envPrefix: ["VITE_"],
  server: {
    proxy: {
      '/api': {
        target: 'https://olympianhouseintl.com',
        changeOrigin: true,
      }
    }
  }
});
