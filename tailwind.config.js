/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces: warm-dark verde-azulado, não preto puro
        bg: {
          base: '#0A0F0D',       // base
          surface: '#111815',    // card
          elevated: '#1A2420',   // elevated
          input: '#0E1411'
        },
        // Texto: verde teal calibrado para AAA
        ink: {
          primary: '#D8F5EB',    // 14:1 AAA - texto principal
          secondary: '#8FE0C7',  // 9:1 AAA - texto secundário
          tertiary: '#5EAA94',   // 5:1 AA - dados terciários
          muted: '#3D6B5C'       // só decorativo
        },
        // Accent: o verde neon de verdade, em doses pequenas
        accent: {
          DEFAULT: '#00FFC2',    // neon vivo (uso pontual)
          glow: '#5EFFD4',       // hover/highlight
          dim: '#00B889',        // 7:1 AAA - texto em accent
          deep: '#0A4D3D'        // backgrounds
        },
        // Linhas estruturais HUD
        hud: {
          line: '#1F4538',       // borders sutis
          bright: '#2A6B57'      // borders ativos
        },
        // Feedback (mantém semântico, ajustado para harmonizar)
        success: { DEFAULT: '#5EFFB8', bg: '#0A2D1F' },
        warning: { DEFAULT: '#FFD479', bg: '#3D2D0A' },
        danger:  { DEFAULT: '#FF7B8C', bg: '#3D1422' },
        info:    { DEFAULT: '#5ED4FF', bg: '#0A2A3D' }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'micro': ['11px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'tiny':  ['12px', { lineHeight: '1.5', letterSpacing: '0.04em' }],
        'small': ['14px', { lineHeight: '1.5' }],
        'body':  ['16px', { lineHeight: '1.5' }],
        'lg':    ['18px', { lineHeight: '1.4' }],
        'xl':    ['22px', { lineHeight: '1.3' }],
        '2xl':   ['28px', { lineHeight: '1.2' }],
        '3xl':   ['34px', { lineHeight: '1.15', letterSpacing: '-0.01em' }]
      },
      spacing: { 'touch': '44px' },
      borderRadius: { DEFAULT: '4px', md: '6px', lg: '10px', xl: '14px' },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideUp: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        pulse: 'pulse 2.5s ease-in-out infinite',
        scan: 'scan 8s linear infinite',
        rotate: 'rotate 24s linear infinite',
        rotateReverse: 'rotateReverse 32s linear infinite',
        blink: 'blink 3s ease-in-out infinite',
        cornerPulse: 'cornerPulse 2s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pulse: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.55 } },
        scan: { '0%': { transform: 'translateY(-10vh)', opacity: 0 }, '10%': { opacity: 1 }, '90%': { opacity: 1 }, '100%': { transform: 'translateY(110vh)', opacity: 0 } },
        rotate: { '0%': { transform: 'rotate(0)' }, '100%': { transform: 'rotate(360deg)' } },
        rotateReverse: { '0%': { transform: 'rotate(0)' }, '100%': { transform: 'rotate(-360deg)' } },
        blink: { '0%, 90%, 100%': { opacity: 1 }, '95%': { opacity: 0.3 } },
        cornerPulse: { '0%, 100%': { opacity: 0.5 }, '50%': { opacity: 1 } }
      },
      boxShadow: {
        'glow-sm': '0 0 8px rgba(0, 255, 194, 0.3)',
        'glow': '0 0 16px rgba(0, 255, 194, 0.4)',
        'glow-lg': '0 0 24px rgba(0, 255, 194, 0.5)'
      }
    }
  },
  plugins: []
}
