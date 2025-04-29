import {
  ThemeProvider,
  createTheme,
  useColorScheme,
} from "@mui/material/styles";
import Card from "@mui/material/Card";
import React, { useMemo, useEffect } from "react";
import styles from "./styles.module.less";

declare global {
  interface WindowEventMap {
    "theme-change": CustomEvent<"light" | "dark">;
  }
}

export function Demo({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    cssVariables: { colorSchemeSelector: "class" },
    colorSchemes: { dark: true },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  const initialMode = useMemo(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
    [],
  );

  // change mui theme based on global theme switcher
  useEffect(() => {
    function handleThemeChange() {}
    window.addEventListener("theme-change", handleThemeChange);
    return () => {
      window.removeEventListener("theme-change", handleThemeChange);
    };
  });

  return (
    <ThemeProvider theme={theme} defaultMode={initialMode}>
      <Card elevation={3} className={styles.demo}>
        {children}
      </Card>
    </ThemeProvider>
  );
}
