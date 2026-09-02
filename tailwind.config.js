/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        void: "#05070d",
        surface: "#0c1220",
        "surface-2": "#111a2c",
        "surface-3": "#162238",
        line: "#22304a",
        "line-bright": "#3a5680",
        ink: "#eef2fa",
        "ink-dim": "#9db0cc",
        "ink-mute": "#66799a",
        blue: "#3b6eff",
        "blue-soft": "#7d9bff",
        cyan: "#22d3ee",
        metal: "#b9c4d9",
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Space Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
