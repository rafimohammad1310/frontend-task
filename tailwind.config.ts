/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#f0f0f0', // Example color, adjust as needed
        'foreground': '#333', // Example color, adjust as needed
        'primary': '#1d4ed8', // Blue
        'secondary': '#9333ea', // Purple
        'accent': '#f59e0b', // Yellow
        'high': '#f87171', // Red
        'medium': '#fbbf24', // Yellow
        'low': '#34d399', // Green
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
      },
      boxShadow: {
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
