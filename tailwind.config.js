/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // === AKAR CERI BRAND PALETTE (Stitch Source of Truth) ===
        cream: '#FFFDEF',
        chocolate: '#290102',
        cherry: '#A7292F',
        sage: '#CDC69A',
        // Derived tints — bounded strictly by brand palette
        'cream-muted': '#F7F5E3',
        'cream-dim': '#F0EDD5',
        'chocolate-muted': '#451D1F',
        'sage-light': '#E8E3C8',
        'sage-dark': '#9A9369',
        // Primary-container / surface semantic aliases (matching Stitch tokens)
        'primary-container': '#A7292F',
        'surface-container': '#F0EDD5',
        'surface-container-low': '#F6F4E6',
        'surface-container-high': '#E8E3C8',
        'surface-container-lowest': '#FFFFFF',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' }
        }
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
        'ping': 'ping 1.4s cubic-bezier(0,0,0.2,1) infinite',
      }
    }
  },
  plugins: [],
}
