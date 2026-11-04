import { useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "@/Shared/Theme/GlobalStyle";
import { darkTheme, lightTheme } from "@/Shared/Theme/theme";
import { translations } from "@/Dictionary/translations";
import type { Language } from "@/Dictionary/translations";
import { AdminUIContext } from "./AdminUIContext";

type ThemeMode = "light" | "dark";

const AdminUIProvider = ({ children }: PropsWithChildren) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return localStorage.getItem("nova_admin_theme") === "dark"
      ? "dark"
      : "light";
  });

  const [language, setLanguage] = useState<Language>(() => {
    return localStorage.getItem("nova_admin_language") === "fa" ? "fa" : "en";
  });

  useEffect(() => {
    localStorage.setItem("nova_admin_theme", themeMode);
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("nova_admin_language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo(
    () => ({
      themeMode,
      language,
      toggleTheme: () => {
        setThemeMode((current) => (current === "light" ? "dark" : "light"));
      },
      toggleLanguage: () => {
        setLanguage((current) => (current === "fa" ? "en" : "fa"));
      },
      t: translations[language],
    }),
    [themeMode, language],
  );

  return (
    <AdminUIContext.Provider value={value}>
      <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </AdminUIContext.Provider>
  );
};

export default AdminUIProvider;
