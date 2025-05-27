import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage:
      {
        "colorfulWater" : 'url("/images/zenitsu.gif")',
        "collegeBuilding" : 'url("/images/collegeBuilding.jpeg")',
        "paper" : 'url("/images/paper.jpg")',
        "psychadelic" : 'url("/images/psychadelic.gif")',
        "sung" : 'url("/images/sung.jpg")',
        "pleasant" : 'url("/images/pleasant.gif")'

      },
      scrollBehavior: ['smooth'],

    },
  },
  plugins: [],
} satisfies Config;
