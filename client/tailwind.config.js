/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            anta: ["Anta", "sans-serif"],
            roboto: ["Roboto", "ui-sans-serif", "system-ui"],
            kanit: ["Kanit", "sans-serif"],
        },
        extend: {
            colors: {
                homebg: "#171717",
                navbg: "#1F1F1F",
            },
        },
    },
    plugins: [],
};
