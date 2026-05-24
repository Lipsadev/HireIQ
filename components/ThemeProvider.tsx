"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to convert hex to RGB
function hexToRgb(hex: string): string {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "198, 167, 94";
}

// Generate color shades dynamically
function generateShades(hex: string) {
  // We can generate lighter and darker variations of the accent color.
  // For simplicity and correctness, we will use predefined premium shades matching each color,
  // or interpolate. Interpolation is best so it works for any custom hex color.
  // Let's implement a simple tint/shade generator:
  const rgb = hexToRgb(hex).split(",").map(x => parseInt(x.trim()));
  const r = rgb[0], g = rgb[1], b = rgb[2];

  const mix = (factor: number, base = [255, 255, 255]) => {
    const mixed = rgb.map((c, i) => Math.round(c + (base[i] - c) * factor));
    return `#${mixed.map(x => x.toString(16).padStart(2, "0")).join("")}`;
  };

  return {
    50: mix(0.9),
    100: mix(0.75),
    200: mix(0.5),
    300: mix(0.3),
    400: mix(0.15),
    500: hex,
    600: mix(0.15, [15, 23, 42]), // mix with dark slate
    700: mix(0.3, [15, 23, 42]),
    800: mix(0.5, [15, 23, 42]),
    900: mix(0.7, [15, 23, 42]),
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [accentColor, setAccentColorState] = useState<string>("#C6A75E");
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("hireiq-theme") as Theme;
    const savedAccent = localStorage.getItem("hireiq-accent");

    if (savedTheme) {
      setThemeState(savedTheme);
    }
    if (savedAccent) {
      setAccentColorState(savedAccent);
    }
    setMounted(true);
  }, []);

  // Update DOM when theme or accent changes
  useEffect(() => {
    if (!mounted) return;

    // Apply theme class
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("hireiq-theme", theme);

    // Apply accent color shades to CSS variables
    const shades = generateShades(accentColor);
    root.style.setProperty("--gold", accentColor);
    root.style.setProperty("--gold-rgb", hexToRgb(accentColor));
    
    Object.entries(shades).forEach(([shade, hexVal]) => {
      root.style.setProperty(`--gold-${shade}`, hexVal);
    });

    localStorage.setItem("hireiq-accent", accentColor);
  }, [theme, accentColor, mounted]);

  const setTheme = (t: Theme) => setThemeState(t);
  const setAccentColor = (c: string) => setAccentColorState(c);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor }}>
      {/* Set initial theme in script to prevent flash of wrong theme */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('hireiq-theme') || 'dark';
                document.documentElement.classList.add(theme);
                var accent = localStorage.getItem('hireiq-accent') || '#C6A75E';
                document.documentElement.style.setProperty('--gold', accent);
              } catch (e) {}
            })();
          `,
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
