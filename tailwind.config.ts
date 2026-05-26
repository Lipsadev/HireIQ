import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // HireIQ Brand
        navy: {
          DEFAULT: "rgb(var(--bg-card-rgb))",
          50: "rgb(var(--text-muted-rgb))",
          100: "rgb(var(--text-secondary-rgb))",
          200: "rgb(var(--text-secondary-rgb))",
          300: "rgb(var(--text-secondary-rgb))",
          400: "rgb(var(--text-secondary-rgb))",
          500: "rgb(var(--text-secondary-rgb))",
          600: "rgb(var(--bg-card-rgb))",
          700: "rgb(var(--bg-sidebar-rgb))",
          800: "rgb(var(--bg-main-rgb))",
          900: "rgb(var(--bg-main-rgb))",
        },
        gold: {
          DEFAULT: "rgb(var(--gold-rgb))",
          50: "var(--gold-50)",
          100: "var(--gold-100)",
          200: "var(--gold-200)",
          300: "var(--gold-300)",
          400: "var(--gold-400)",
          500: "rgb(var(--gold-rgb))",
          600: "var(--gold-600)",
          700: "var(--gold-700)",
          800: "var(--gold-800)",
          900: "var(--gold-900)",
        },
        beige: "#E8DCC8",
        slate: {
          DEFAULT: "rgb(var(--text-main-rgb))",
          50: "rgb(var(--text-main-rgb))",
          100: "rgb(var(--text-main-rgb))",
          200: "rgb(var(--text-main-rgb))",
          300: "rgb(var(--text-secondary-rgb))",
          400: "rgb(var(--text-secondary-rgb))",
          500: "rgb(var(--text-muted-rgb))",
          600: "rgb(var(--text-muted-rgb))",
          700: "rgb(var(--text-muted-rgb))",
          800: "rgb(var(--bg-main-rgb))",
          900: "rgb(var(--bg-main-rgb))",
        },
        // Semantic
        background: "var(--bg-main)",
        surface: "var(--bg-card)",
        border: "var(--border-color)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero":
          "radial-gradient(ellipse at top, #1F2A44 0%, #111827 50%, #0D1117 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #C6A75E 0%, #E8DCC8 50%, #C6A75E 100%)",
        "gradient-card":
          "linear-gradient(145deg, rgba(31,42,68,0.8) 0%, rgba(17,24,39,0.9) 100%)",
        "glow-gold":
          "radial-gradient(circle at center, rgba(var(--gold-rgb), 0.15), transparent 70%)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(var(--gold-rgb), 0.15), 0 4px 20px rgba(0,0,0,0.4)",
        "gold-lg":
          "0 0 40px rgba(var(--gold-rgb), 0.2), 0 8px 40px rgba(0,0,0,0.5)",
        card: "0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(var(--gold-rgb), 0.1)",
        glow: "0 0 30px rgba(var(--gold-rgb), 0.3)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-in": "slideIn 0.5s ease forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "counter-up": "counterUp 1s ease forwards",
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(198,167,94,0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(198,167,94,0.5)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
