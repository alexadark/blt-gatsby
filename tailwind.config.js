const rem = (px) => px / 16 + "rem";

//palette
const darkBlue = "#263c58",
  lightBlue = "#a9e8ff",
  veryLightBlue = "#c0eeff",
  blue1 = "#eaecf2",
  blueLink = "#3a8de1",
  gold = "#d3b27d",
  lightGold = "#d2be9b",
  veryLightGold = "#f8f3ec",
  black = "#000000",
  grey5 = "#494949",
  grey4 = "#676767",
  grey3 = "#ababab",
  grey2 = "#e1e1e1",
  grey1 = "#f8f5f5",
  white = "#fff",
  orange = "#fda658";

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],

  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      debugScreens: {
        position: ["top", "left"],
        style: {
          backgroundColor: "black",
          color: "#fff",
        },
      },
      container: {
        center: true,
      },
      fontSize: {
        "f-12": rem(12),
        "f-14": rem(14),
        "f-16": rem(16),
        "f-18": rem(18),
        "f-20": rem(20),
        "f-22": rem(22),
        "f-24": rem(24),
        "f-26": rem(26),
        "f-28": rem(28),
        "f-30": rem(30),
        "f-36": rem(36),
        "f-40": rem(40),
        "f-60": rem(60),
        "f-64": rem(64),
      },

      colors: {
        darkBlue,
        lightBlue,
        veryLightBlue,
        blue1,
        blueLink,
        gold,
        lightGold,
        veryLightGold,
        black,
        grey1,
        grey2,
        grey3,
        grey4,
        grey5,
        white,
        orange,
        primary: darkBlue,
        highlight: gold,
        text: "#3c3c3c",
      },
      spacing: {
        base: rem(15),
        base2: rem(30),
        "50px": "50px",
      },
      transitionProperty: {
        height: "height",
      },
      borderRadius: {
        sm: "3px",
      },
      boxShadow: {
        section: "0 0 34px 0 rgba(0, 0, 0, 0.1)",
        input: "0 2px 44px 0 rgba(0, 0, 0, 0.08)",
        listing: "0 2px 24px 0 rgba(0, 0, 0, 0.08)",
      },
      maxWidth: {
        big: "1400px",
      },
      fontFamily: {
        sans: `"Proxima Nova", "Trebuchet MS", sans-serif`,
        script: `Adinda Melia`,
      },
      borderWidth: {
        3: "3px",
      },
      fontWeight: {
        body: 400,
        heading: 400,
        semiBold: 600,
        bold: 700,
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#3c3c3c",
            a: {
              color: blueLink,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            "h1,h2,h3,h4,h5,h6": {
              color: "#494949",
            },
            h2: {
              fontSize: "36px",
              color: "#494949",
            },
            ol: {
              counterReset: "item",
              listTyleType: "none",

              li: {
                marginBottom: "18px",
                paddingLeft: "50px",
                display: "flex",

                "&:before": {
                  content: 'counter(item)" "',
                  counterIncrement: "item",
                  fontWeight: "bold",
                  fontSize: "22px",
                  display: "flex",
                  width: "30px",
                  height: "30px",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "3px solid",
                  borderColor: gold,
                  top: "4px",
                },
              },
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
  corePlugins: {
    preflight: true,
  },
};
