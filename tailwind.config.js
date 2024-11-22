/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d13232",
        secondary: "#804343",
        tertiary: "#d2d2d2",
        danger: "#ff561b",
        "status-ended": "#16a34a",
        "status-completed": "#007c6c",
        "status-pending": "#ea580c",
        "status-cancelled": "#dc2626",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadein: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        showFromLeft: {
          "0%": { left: "-100%" },
          "100%": { left: "0%" },
        },
      },
      animation: {
        fadein: "fadein 0.5s",
        rotate: "rotate 1s linear infinite",
        showFromLeft: "showFromLeft 0.3s",
      },
    },
  },
  plugins: [],
};
