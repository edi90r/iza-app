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
        extend: {
            fontWeight: {
                300: '300',
                400: '400',
                700: '700',
            },
            width: {
                64: '32rem',
            },
            minWidth: {
                0: '0px',
                1: '.25rem',
                2: '.5rem',
                3: '.75rem',
                4: '1rem',
                5: '1.25rem',
                6: '1.5rem',
                7: '1.75rem',
                8: '2rem',
                9: '2.25rem',
                10: '2.25rem',
                11: '2.75rem',
                12: '3rem',
                14: '3.5rem',
                16: '4rem',
                20: '5rem',
                24: '6rem',
                28: '7rem',
                32: '8rem',
                36: '9rem',
                40: '10rem',
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                light: {
                    ...require('daisyui/src/theming/themes')['light'],
                    pureWhite: '#FFFFFF',
                    gray: '#949494',
                    black: '#000000',
                    primary: '#01344C',
                    error: '#D62620',
                    warning: '#F5A700',
                    success: '#2E9F40',
                },
            },
        ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: 'dark', // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ':root', // The element that receives theme color CSS variables
    },
};
/*
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
*/
