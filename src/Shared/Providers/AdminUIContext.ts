import { createContext } from "react";
import type { Language, translations } from "@/Dictionary/translations";

type ThemeMode = "light" | "dark";

export interface AdminUIContextType {
  themeMode: ThemeMode;
  language: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  t: (typeof translations)[Language];
}

export const AdminUIContext = createContext<AdminUIContextType | null>(null);
