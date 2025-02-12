"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: [
      "#EFF6FF", // 0
      "#DBEAFE", // 1
      "#BFDBFE", // 2
      "#93C5FD", // 3
      "#60A5FA", // 4
      "#3B82F6", // 5
      "#2563EB", // 6: primary
      "#1D4ED8", // 7
      "#1E40AF", // 8
      "#1E3A8A", // 9
    ],
  },
  radius: {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  shadows: {
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  defaultRadius: "md",
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
      styles: {
        root: {
          fontWeight: 500,
        },
      },
    },
    Input: {
      defaultProps: {
        radius: "md",
      },
    },
    Card: {
      defaultProps: {
        radius: "md",
        shadow: "sm",
      },
    },
    Paper: {
      defaultProps: {
        radius: "md",
        shadow: "sm",
      },
    },
  },
});
