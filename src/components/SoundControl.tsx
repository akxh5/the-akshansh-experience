import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { 
  getTrackForContext, 
  switchTrack, 
  toggleSound, 
  isEnabled 
} from "@/lib/audio";
import { cn } from "@/lib/utils";

export const SoundControl = React.memo(function SoundControl() {
  const { theme, atmosphere } = useTheme();
  const [enabled, setEnabled] = useState(false);
  
  const isLight = theme === "winter-ivory";
  
  useEffect(() => {
    setEnabled(isEnabled());
  }, []);

  useEffect(() => {
    if (enabled) {
      const targetTrack = getTrackForContext(theme, atmosphere);
      switchTrack(targetTrack);
    }
  }, [theme, atmosphere, enabled]);

  const handleToggle = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    const targetTrack = getTrackForContext(theme, atmosphere);
    toggleSound(nextState, targetTrack);
  };

  return (
    <div className="fixed top-6 right-6 z-50 pointer-events-auto">
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 rounded-[20px] border shadow-2xl backdrop-blur-[24px] transition-all duration-500",
          isLight 
            ? "bg-white/55 border-black/10 shadow-black/5 hover:border-black/20" 
            : "bg-[#0f131d]/45 border-white/10 shadow-white/5 hover:border-white/20"
        )}
      >
        <div className="relative w-[18px] h-[18px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {enabled ? (
              <motion.div
                key="pause"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Pause size={18} strokeWidth={1.5} className="text-[var(--accent)]" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Play size={18} strokeWidth={1.5} className="text-[var(--text-muted)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-[var(--text-muted)] uppercase">
          {enabled ? "PLAYING" : "ATMOSPHERE"}
        </span>
      </motion.button>
    </div>
  );
});
