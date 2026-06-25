/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          rose: "#E75480",
          light: "#F5E6E8",
          accent: "#FF69B4",
          50: "#FDF2F8",
          100: "#FCE7F3",
          200: "#FBCFE8",
          300: "#F8B4D6",
          400: "#F472B6",
          500: "#EC4899",
          600: "#DB2777",
          700: "#BE185d",
          800: "#9D174D",
          900: "#831843",
        },
        brown: {
          earth: "#6B4423",
          light: "#D4A574",
          dark: "#3E2723",
          50: "#FDF4EE",
          100: "#FAEAD5",
          200: "#F5D5B8",
          300: "#EFC9A1",
          400: "#E8AD7E",
          500: "#E0935D",
          600: "#D4783E",
          700: "#B85C25",
          800: "#96471C",
          900: "#7A3818",
        },
        accent: {
          gold: "#D4AF37",
          cream: "#FFFAF0",
        },
        brand: {
          rose: "#c14756",     // raspberry
          green: "#5f6c40",    // deep green
          cream: "#f9f0eb",    // ivory
          pinkBg: "#f2c0bf",   // blush pink
          springGreen: "#aac05c" // spring green
        },
      },
      fontFamily: {
        display: ["Zaslia", "Playfair Display", "serif"],
        body: ["Merriweather", "serif"],
        ui: ["Poppins", "sans-serif"],
        zaslia: ["Zaslia", "serif"],
        mustasurma: ["Mustasurma", "sans-serif"],
      },
      fontSize: {
        h1: ["72px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["48px", { lineHeight: "1.3", fontWeight: "700" }],
        h3: ["32px", { lineHeight: "1.4", fontWeight: "600" }],
        h4: ["24px", { lineHeight: "1.5", fontWeight: "600" }],
        h5: ["18px", { lineHeight: "1.5", fontWeight: "600" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.08)",
        card: "0 8px 24px rgba(0, 0, 0, 0.1)",
        hover: "0 20px 40px rgba(231, 84, 128, 0.15)",
        deep: "0 30px 60px rgba(0, 0, 0, 0.3)",
        glow: "0 0 30px rgba(231, 84, 128, 0.3)",
      },
      backgroundImage: {
        "paper-texture": "url('data:image/svg+xml,...')",
        "gradient-pink-brown":
          "linear-gradient(135deg, #E75480 0%, #D4A574 100%)",
        "gradient-subtle":
          "linear-gradient(135deg, rgba(231, 84, 128, 0.05) 0%, rgba(212, 175, 116, 0.05) 100%)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        beat: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1)" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(231, 84, 128, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(231, 84, 128, 0.8)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in",
        slideUp: "slideUp 0.6s ease-out",
        float: "float 4s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        beat: "beat 0.6s ease-in-out",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
