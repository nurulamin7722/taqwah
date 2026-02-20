/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f172a',
        'dark-secondary': '#1e293b',
        'primary-green': '#10b981',
        'accent-green': '#34d399',
      },
    },
  },
  plugins: [],
};

export default config;
