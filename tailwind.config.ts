/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        red: {
          DEFAULT: "#FF4401",
          10: "#FFECE6",
          60: "#FF8F67",
          80: "#FF6934",
          90: "#FF571A",
        },
        orange: {
          DEFAULT: "#FD7240",
        },
        yellow: {
          DEFAULT: "#EA942C",
          10: "#FDF4EA",
        },
        blue: {
          DEFAULT: "#347AE2",
          10: "#EBF2FC",
        },
        purple: {
          DEFAULT: "#6570f7",
        },
        green: {
          DEFAULT: "#0ECC8D",
          10: "#E7FAF4",
        },
        lightBackground: {
          DEFAULT: "#FFF",
          2: "#F7F7F7",
          5: "#C5D0E6",
          6: "#F4F6F8",
        },
        dark: {
          DEFAULT: "#262D34",
          dark2: "#1E252B",
          dark3: "#2C323A",
          dark4: "#3A424C",
          secondary1: "#192351",
          secondary2: "#3F4354",
          secondary4: "#858EAD",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  },
};
