import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,html}"
  ],
  safelist: [
    { pattern: /^bg-[a-z]+-[1-9]00$/, variants: ['hover', 'focus'] },
    { pattern: /^text-[a-z]+-[1-9]00$/, variants: ['hover', 'focus'] },
    { pattern: /^border-[a-z]+-[1-9]00$/, variants: ['hover', 'focus'] },
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
export default config
