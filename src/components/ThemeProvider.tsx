import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "midnight-snowfall" | "winter-ivory";
export type Atmosphere = "snow" | "rain";

interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
  atmosphere: Atmosphere;
  setAtmosphere: (a: Atmosphere) => void;
}
const Ctx = createContext<ThemeCtx>({ 
  theme: "midnight-snowfall", 
  toggle: () => {}, 
  atmosphere: "snow", 
  setAtmosphere: () => {} 
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("midnight-snowfall");
  const [atmosphere, setAtmosphereState] = useState<Atmosphere>("snow");

  useEffect(() => {
    const storedTheme = (typeof window !== "undefined" && localStorage.getItem("akshansh-theme")) as Theme | null;
    if (storedTheme === "winter-ivory" || storedTheme === "midnight-snowfall") setTheme(storedTheme);

    const storedAtmos = (typeof window !== "undefined" && localStorage.getItem("akshansh-atmosphere")) as Atmosphere | null;
    if (storedAtmos === "snow" || storedAtmos === "rain") setAtmosphereState(storedAtmos);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("winter-ivory", theme === "winter-ivory");
    document.documentElement.classList.toggle("atmosphere-rain", atmosphere === "rain");
    try { localStorage.setItem("akshansh-theme", theme); } catch {}
    try { localStorage.setItem("akshansh-atmosphere", atmosphere); } catch {}
  }, [theme, atmosphere]);

  const setAtmosphere = (a: Atmosphere) => {
    setAtmosphereState(a);
  };

  return (
    <Ctx.Provider value={{ 
      theme, 
      toggle: () => setTheme((t) => (t === "midnight-snowfall" ? "winter-ivory" : "midnight-snowfall")),
      atmosphere,
      setAtmosphere
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTheme = () => useContext(Ctx);
