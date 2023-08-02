/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "light-black": "#333333",
                "pale-black": "#444444",
            },
        },
    },
    plugins: [],
    darkMode: "class", // https://tailwindcss.com/docs/dark-mode, https://github.com/pacocoursey/next-themes#with-tailwind
};
