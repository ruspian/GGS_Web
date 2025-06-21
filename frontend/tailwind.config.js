import { heroui } from "@heroui/react";
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    animation: {
      float1: "float1 6s ease-in-out infinite",
      float2: "float2 5s ease-in-out infinite",
      float3: "float3 7s ease-in-out infinite",
    },
    keyframes: {
      float1: {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-10px)" },
      },
      float2: {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-15px)" },
      },
      float3: {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-8px)" },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
