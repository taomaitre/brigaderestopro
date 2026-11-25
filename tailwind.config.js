/** @type {import('tailwindcss').Config} */
// Tailles de texte (25/11) : une seule échelle pour tout le logiciel, réglée par les variables de src/index.css
// (--t-xs … --t-3xl). 14 px minimum, 16 px pour le texte courant, 20 à 24 px pour les titres ; multipliée par le
// réglage « Taille du texte » de l'appareil. Les étiquettes et l'impression gardent leurs tailles d'origine.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontSize: {
        xs: ['var(--t-xs)', { lineHeight: '1.35' }],
        sm: ['var(--t-sm)', { lineHeight: '1.45' }],
        base: ['var(--t-base)', { lineHeight: '1.5' }],
        lg: ['var(--t-lg)', { lineHeight: '1.4' }],
        xl: ['var(--t-xl)', { lineHeight: '1.3' }],
        '2xl': ['var(--t-2xl)', { lineHeight: '1.25' }],
        '3xl': ['var(--t-3xl)', { lineHeight: '1.2' }],
      },
    },
  },
  plugins: [],
};
