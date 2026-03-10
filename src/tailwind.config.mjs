/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.6', letterSpacing: '0.02em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.02em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.6', letterSpacing: '0.02em', fontWeight: '700' }],
                '2xl': ['1.5rem', { lineHeight: '1.6', letterSpacing: '0.02em', fontWeight: '700' }],
                '3xl': ['1.875rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1.3', letterSpacing: '0.02em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '0.02em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1.05', letterSpacing: '0.02em', fontWeight: '700' }],
                '9xl': ['8rem', { lineHeight: '1.0', letterSpacing: '0.02em', fontWeight: '700' }],
            },
            fontFamily: {
                heading: "helvetica-w01-roman",
                paragraph: "helvetica-w01-roman"
            },
            colors: {
                destructive: '#dc3545',
                'destructive-foreground': '#FFFFFF',
                'accent-grey': '#F5F5F5',
                'dark-grey': '#333333',
                background: '#FFFFFF',
                secondary: '#666666',
                foreground: '#000000',
                'secondary-foreground': '#FFFFFF',
                'primary-foreground': '#FFFFFF',
                primary: '#007AFF',
                'text-body': '#333333',
                'text-header': '#000000',
                'border-light': '#E5E5E5'
            },
            spacing: {
                'section-sm': '80px',
                'section-md': '100px',
                'section-lg': '120px',
            }
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
