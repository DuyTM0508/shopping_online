/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans JP"', "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": { min: "1440px" },
      },
    },
    extend: {
      screens: {
        "2xl": { max: "1440px" }, // Custom breakpoint for <=1440px
      },
      colors: {
        navbar: "#FFFFFF",
        sidebar: "#FFFFFF",
        redCalendar: "#f8d6d5",
        headerCalendar: "rgba(60, 60, 67, 0.3)",
        blueCalendar: "#cde9e5",
        bgContainerContent: "rgba(0, 0, 0, 0.02)",
        bgLoadingApp: "rgba(255, 255, 255, 0.1)",
        bgDayOfBigCalendar: "rgba(0, 0, 0, 0.2)",
        bgGray: "#F9F9F9",
        gray: "#A2A2A2",
        bg: {
          bgGray: "#F9FAFC",
          bgTableHover: "#F3FAFD",
          buttonPagingDisabled: "#f7f9fc",
          bgPrimary: "#CDEAE7",
          bgBagde: "#CDEAE7",
        },

        cardProduct: {
          bgCard: "#FFFFFF",
          borderHover: "#112E4E",
        },
        main: {
          primary: "#6898AB",
          secondary: "#18AA99",
          info: "#8BD2E5",
          error: "#EE4540",
          foreground: "#2D142C",
          unActive: "#f1f1f1",
          done: "#18AA99",
          light: "#F0F5F7",
          blue1: "#007AFF",
          blue2: "#E6F2FF",
          green1: "#C6E9EC",
        },
        text: {
          primary: "#000000",
          secondary: "#333333",
          third: "#666666",
          four: "#112E4E",
          five: "#767575",
          six: "#2D2D2D",
          sevent: "#636363",
          info: "#2264E5",
          sub: "#687182",
          textTableMain: "#171C26",
          textTable: "#464F60",
        },
        table: {
          headerBackground: "#E4E6EA",
        },
        icon: {
          search: "#1B1B1B",
        },
        toast: {
          textSuccess: "#237B4B",
          success: "#E7F2DA",
          borderSuccess: "#BDDA9B",
          error: "#F3D6D8",
          textError: "#C4314B",
          borderError: "#F3D6D8",
        },
        disabled: "#d9d9d9",
        borderMenu: "rgba(0, 0, 0, 0.12)",
        border: "hsl(var(--border))",
        borderInput: "#E8E8E8",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
