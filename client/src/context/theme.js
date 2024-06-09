import { createContext, useContext } from "react";

export const themeContext = createContext({
  mode: "light",
  toggleTheme: () => {},
});

export const useTheme = () => {
  return useContext(themeContext);
};

export const ThemeProvider = themeContext.Provider;
