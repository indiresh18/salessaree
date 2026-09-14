/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: "#58111A",
          wine: "#721B38",
          deepBurgundy: "#3D0911",
          rose: "#D43867",
          pink: "#E05282",
          lightPink: "#FDF0F4",
          gold: "#C5A059",
          brightGold: "#D4AF37",
          lightGold: "#F7F1E5",
          ivory: "#FFFDF9",
          cream: "#FAF8F5",
          charcoal: "#2D2B2A",
          muted: "#6B7280"
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(88, 17, 26, 0.05)',
        'gold-glow': '0 0 15px rgba(197, 160, 89, 0.2)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
