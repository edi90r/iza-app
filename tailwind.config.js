/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            pureWhite: '#FFFFFF',
            gray: '#949494',
            black: '#000000',
            darkBlue: '#01344C',
            crimson: '#D62620',
            amber: '#F5A700',
            jade: '#2E9F40',
        },
        fontFamily: {
            montserrat: ['Montserrat', 'sans-serif'],
            hind: ['Hind', 'sans-serif'],
        },
        extend: {},
    },
    plugins: [],
};
