import { ReactNode, createContext, useState } from "react";
import { darkTheme, lightTheme } from "../theme";

type ThemeContextData = {
  theme: typeof lightTheme | typeof darkTheme
  toggleTheme: () => void
  isDark: boolean
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeContext = createContext({} as ThemeContextData)

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(lightTheme);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const newTheme = isDark
      ? lightTheme
      : darkTheme

    setTheme(newTheme)
    setIsDark(!isDark)
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isDark
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider