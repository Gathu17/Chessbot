/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        maxWidth: "1600px",
        padding: "1rem",
        screens: {
          sm: "100%",
          md: "100%",
          lg: "800px",
          xl: "1200px",
        },
      },
      backgroundImage: {
        hero: "url('https://cdn.dribbble.com/users/340292/screenshots/16026897/media/2ce9483a6be886cb1d0c3b19a285c511.jpg')",
      },
    },
  },
  plugins: [],
};
