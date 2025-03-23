import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        colorGlow: {
          "0%, 100%": { color: "#1f2937" }, // gray-800
          "50%": { color: "#3b82f6" }, // blue-500
        },
      },
      animation: {
        colorGlow: "colorGlow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
