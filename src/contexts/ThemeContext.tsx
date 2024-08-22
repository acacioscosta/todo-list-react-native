import { ReactNode, createContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../theme";
import { asyncStorage } from "../../services/asyncStorage";

export type ThemeType = typeof lightTheme | typeof darkTheme

type ThemeContextData = {
  theme: ThemeType
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

  useEffect(() => {
    checkThemeStorage()
  }, [])

  const checkThemeStorage = async () => {
    const mapTheme = {
      light: lightTheme,
      dark: darkTheme
    }

    const themeSaved = await asyncStorage.getItem('theme') as 'light' | 'dark' | null

    if (!themeSaved) {
      setTheme(lightTheme)
      setIsDark(false)

      return
    }

    setTheme(mapTheme[themeSaved])
    setIsDark(themeSaved === 'dark')
  }

  const toggleTheme = () => {
    const newTheme = isDark
      ? lightTheme
      : darkTheme

    setTheme(newTheme)
    setIsDark(!isDark)

    asyncStorage.setItem('theme', isDark ? 'light' : 'dark')
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