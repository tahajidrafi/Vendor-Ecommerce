/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#BE3756", // Add a reusable 'primary' color
      },
    },
  },
  plugins: [],
};
