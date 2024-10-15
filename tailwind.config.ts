import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {

        'xs': '250px',  // Custom breakpoint for extra small screens
        'sm': '300px',  // Small screen breakpoint (default)
        'md': '900px',  // Medium screen breakpoint (default)
        'lg': '1024px', // Large screen breakpoint (default)
        'xl': '1280px', // Extra large screen breakpoint (default)
        '2xl': '1536px',// 2X large screen breakpoint (default)
        '3xl': '1920px',// Custom breakpoint for very large screens
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gtext: '#7DFFAF',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        scroll: 'scroll 25s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
