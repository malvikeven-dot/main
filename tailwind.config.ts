import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A0F2C",
          50: "#f0f1f9",
          100: "#d8daf0",
          200: "#b0b4e1",
          300: "#898ed2",
          400: "#6268c3",
          500: "#4a52b3",
          600: "#3a4199",
          700: "#2d3280",
          800: "#1a1e52",
          900: "#0A0F2C",
        },
        blue: {
          DEFAULT: "#2D6AFF",
          50: "#eff4ff",
          100: "#dce7ff",
          200: "#b9d0ff",
          300: "#89b0ff",
          400: "#5688ff",
          500: "#2D6AFF",
          600: "#1a4df5",
          700: "#143ae1",
          800: "#1730b6",
          900: "#182d8f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        gradient: "gradient 8s ease infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(rgba(45, 106, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 106, 255, 0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-sm": "40px 40px",
        "grid-md": "60px 60px",
      },
    },
  },
  plugins: [],
};

export default config;
