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
  			sans: [
  				'var(--font-inter)'
  			],
  			mono: [
  				'var(--font-geist-mono)'
  			]
  		},
  		keyframes: {
  			'pulse-system': {
  				'0%, 100%': {
  					boxShadow: '0 0 5px #00b8ff'
  				},
  				'50%': {
  					boxShadow: '0 0 20px #00b8ff'
  				}
  			}
  		},
  		animation: {
  			'pulse-system': 'pulse-system 2s infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
