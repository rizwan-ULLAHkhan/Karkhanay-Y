/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'xs': '350px',
        'sm': '580px',
        'md': '768px',
        'lg': '1100px',
        'xl': '1280px',
        '2xl': '1536px',
      },
            colors: {
        cyan: '#A1FFF7',
        heather: '#B8AEDA',
        Kgreen:'#8cc43c',        
        Korange: '#f2a344', 
        Kgray:'#808080',
        Kblue: 'black'
      },
    },
  },
  plugins: [],
}
