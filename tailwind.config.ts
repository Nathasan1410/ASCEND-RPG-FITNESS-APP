import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			void: {
  				deep: '#050505'
  			},
  			system: {
  				dark: '#0a0a0f',
  				panel: '#12121a',
  				border: '#2a2a35',
  				accent: '#00b8ff',
  				cyan: '#00b8ff',
  				blue: '#0066ff'
  			},
  			ios: {
  				bg: {
  					primary: '#000000',
  					secondary: 'rgba(28, 28, 30, 0.8)',
  					tertiary: 'rgba(44, 44, 46, 0.7)',
  				},
  				text: {
  					primary: '#FFFFFF',
  					secondary: 'rgba(235, 235, 245, 0.6)',
  				},
  				border: 'rgba(255, 255, 255, 0.12)',
  				divider: 'rgba(255, 255, 255, 0.08)',
  				accent: '#00B8FF',
  				success: '#34C759',
  				warning: '#FF9500',
  				error: '#FF3B30',
  			},
  			rank: {
  				e: {
  					DEFAULT: '#8a8a8a',
  					glow: 'rgba(138, 138, 138, 0.5)'
  				},
  				d: {
  					DEFAULT: '#ffffff',
  					glow: 'rgba(255, 255, 255, 0.5)'
  				},
  				c: {
  					DEFAULT: '#55ead4',
  					glow: 'rgba(85, 234, 212, 0.5)'
  				},
  				b: {
  					DEFAULT: '#00b8ff',
  					glow: 'rgba(0, 184, 255, 0.6)'
  				},
  				a: {
  					DEFAULT: '#bd00ff',
  					glow: 'rgba(189, 0, 255, 0.6)'
  				},
  				s: {
  					DEFAULT: '#f3e600',
  					glow: 'rgba(243, 230, 0, 0.7)'
  				}
  			},
  			status: {
  				success: '#00ff9f',
  				warning: '#ffd300',
  				error: '#ff003c'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'SF Pro', 'Inter', 'sans-serif'],
  			mono: ['var(--font-geist-mono)']
  		},
  		fontSize: {
  			'mobile-hero': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
  			'mobile-h1': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
  			'mobile-body': ['1rem', { lineHeight: '1.5', letterSpacing: '0' }],
  			'mobile-small': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0' }],
  		},
  		spacing: {
  			'ios-xs': '0.5rem',
  			'ios-sm': '0.75rem',
  			'ios-md': '1rem',
  			'ios-lg': '1.5rem',
  			'ios-xl': '2rem',
  			'ios-2xl': '2.5rem',
  		},
  		keyframes: {
  			'pulse-system': {
  				'0%, 100%': {
  					boxShadow: '0 0 5px #00b8ff'
  				},
  				'50%': {
  					boxShadow: '0 0 20px #00b8ff'
  				}
  			},
  			'ios-pulse': {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.7' },
  			}
  		},
  		animation: {
  			'pulse-system': 'pulse-system 2s infinite',
  			'ios-pulse': 'ios-pulse 2s ease-in-out infinite',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'ios-xl': '1.25rem',
  			'ios-2xl': '1.5rem',
  			'ios-3xl': '2rem',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
