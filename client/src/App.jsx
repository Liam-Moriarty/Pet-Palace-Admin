import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, Adoption, Forms, Rescue } from "./pages/index";
import Sidebar from "./component/Sidebar";

const App = () => {
  const storedMode = localStorage.getItem("themeMode");
  const [mode, setMode] = useState(storedMode || "light");

  // function to toggle theme dark and light
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  // add useEffect to add dark or light mode in html root
  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(mode);
  }, [mode]);

  useEffect(() => {
    // Set initial theme mode when component mounts
    const initialMode = localStorage.getItem("themeMode") || "light";
    setMode(initialMode);
  }, []);

  return (
    <ThemeProvider value={{ mode, toggleTheme }}>
      <Router>
        <main className="h-screen flex bg-light-primary dark:bg-primary">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/adoption" element={<Adoption />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/rescue" element={<Rescue />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
