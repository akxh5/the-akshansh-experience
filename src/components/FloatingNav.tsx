import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Feather, 
  BookOpen, 
  Layers, 
  PenLine, 
  Info, 
  Moon, 
  Sun, 
  Snowflake, 
  CloudRain, 
  User
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Feather },
  { to: "/poems", label: "Poems", icon: BookOpen },
  { to: "/collections", label: "Collections", icon: Layers },
  { to: "/submit", label: "Submit", icon: PenLine },
  { to: "/about", label: "About", icon: Info },
];

export function FloatingNav() {
  const { theme, toggle, atmosphere, setAtmosphere } = useTheme();
  const { user, signOut } = useAuth();
  const { location } = useRouterState();
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const currentPath = location.pathname;
  const isLight = theme === "winter-ivory";
  const userInitial = user?.email?.[0].toUpperCase() || "?";

  // Handle outside clicks for user menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cycleAtmosphere = () => {
    if (isLight) return;
    setAtmosphere(atmosphere === "snow" ? "rain" : "snow");
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none">
      {/* USER DROPDOWN MENU */}
      <AnimatePresence>
        {showUserMenu && user && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-2 w-48 overflow-hidden rounded-[16px] border shadow-2xl backdrop-blur-3xl saturate-150 pointer-events-auto"
            style={{
              backgroundColor: isLight ? "rgba(245, 240, 232, 0.9)" : "rgba(15, 19, 29, 0.9)",
              borderColor: isLight ? "rgba(138, 106, 58, 0.15)" : "rgba(196, 212, 245, 0.15)",
              bottom: '100%',
              marginBottom: '8px'
            }}
          >
            <div className="flex flex-col p-2">
              <Link
                to="/dashboard"
                onClick={() => setShowUserMenu(false)}
                className="w-full text-left px-4 py-3 text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[var(--text-primary)] hover:bg-[var(--accent)]/10 rounded-[8px] transition-colors whitespace-nowrap"
              >
                My Dashboard
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-4 py-3 text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[#c0544a] hover:bg-red-400/5 rounded-[8px] transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav 
        className="flex items-center gap-1 p-[10px] md:px-4 md:py-[10px] transition-all duration-500 rounded-[24px] pointer-events-auto shadow-2xl"
        style={{
          backgroundColor: isLight ? "rgba(245, 240, 232, 0.45)" : "rgba(15, 19, 29, 0.45)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: isLight ? "1px solid rgba(138, 106, 58, 0.12)" : "1px solid rgba(196, 212, 245, 0.12)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)"
        }}
      >
        {/* NAV SECTION */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.to || (item.to !== "/" && currentPath.startsWith(item.to));
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to as any}
                className={cn(
                  "relative flex items-center justify-center w-[44px] h-[44px] transition-colors duration-200",
                  isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)] opacity-50 hover:text-[var(--text-secondary)] hover:opacity-100"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-[14px]"
                    style={{
                      backgroundColor: isLight ? "rgba(74, 96, 128, 0.1)" : "rgba(196, 212, 245, 0.1)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 35,
                      mass: 0.8
                    }}
                  />
                )}
                
                <div className="relative z-10">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* DIVIDER */}
        <div className="w-[1px] h-5 bg-[var(--border)] opacity-20 mx-1" />

        {/* CONTROLS SECTION */}
        <div className="flex items-center gap-1">
          {/* Theme Toggle */}
          <button 
            onClick={toggle}
            className={cn(
              "flex items-center justify-center w-[44px] h-[44px] transition-colors duration-200", 
              isLight ? "text-[var(--text-muted)]" : "text-[var(--accent)]"
            )}
            aria-label="Toggle Theme"
          >
            {isLight ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
          </button>

          {/* Atmosphere Toggle */}
          <button 
            onClick={cycleAtmosphere}
            disabled={isLight}
            className={cn(
              "relative flex items-center justify-center w-[44px] h-[44px] transition-colors duration-200", 
              isLight ? "opacity-25 cursor-not-allowed text-[var(--text-muted)]" : "text-[var(--accent)]"
            )}
            aria-label="Cycle Atmosphere"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {atmosphere === "snow" ? (
                  <motion.div
                    key="snow"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Snowflake size={20} strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="rain"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CloudRain size={20} strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>

          {/* User Indicator */}
          <div className="flex items-center justify-center w-[44px] h-[44px]">
            {user ? (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-7 h-7 rounded-full bg-[var(--accent)] text-[var(--bg-base)] flex items-center justify-center text-[11px] font-bold tracking-tight shadow-lg hover:scale-105 transition-transform pointer-events-auto"
              >
                {userInitial}
              </button>
            ) : (
              <Link
                to="/auth"
                search={{ redirect: currentPath }}
                className="text-[var(--text-muted)] opacity-50 hover:opacity-100 hover:text-[var(--text-primary)] transition-all flex items-center justify-center w-full h-full pointer-events-auto"
              >
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
