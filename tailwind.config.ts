import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nature & Kerala Backwater Luxury Palette
        backwater: {
          dark: "#082119",           // Midnight backwater depth
          emerald: "#0E382C",        // Signature lush mangrove emerald
          leaf: "#165845",           // Vibrant palm leaf green
          gold: "#C25E00",           // Deep sunset amber
          amber: "#D97706",          // Warm golden hour sunlight
          amberLight: "#FEF3C7",     // Soft warm glow
          sand: "#F3EEE6",           // Warm limestone sand
          linen: "#FAF8F5",          // Warm ivory canvas
          border: "#E7DFD3",         // Soft organic border
          ink: "#121A17",            // Obsidian charcoal text
          muted: "#5A6962",          // Soft moss-grey body text
        },
        // Clean interface colors
        asana: {
          coral: "#E65A4B",          // Warm terracotta-coral
          coralHover: "#CD4435",
          coralLight: "#FEF2F0",
          ink: "#121A17",
          muted: "#5A6962",
          bg: "#FAF8F5",
          surface: "#F4EFEA",
          border: "#E7DFD3",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
        serif: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        nature: "0 4px 20px -2px rgba(14, 56, 44, 0.08)",
        natureHover: "0 16px 36px -4px rgba(14, 56, 44, 0.16)",
        goldGlow: "0 4px 25px rgba(217, 119, 6, 0.25)",
      },
      borderRadius: {
        "pill": "9999px",
        "card": "1.5rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};

export default config;
