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
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: 'dark', // name of one of the included themes for dark mode
        base: false, // applies background color and foreground color for root element by default
        styled: false, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ':root', // The element that receives theme color CSS variables
    },
};
