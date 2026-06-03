import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface HeroProps {
  excerpt?: string;
  slug?: string;
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reset on text change
    setDisplayed("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index >= text.length) return;
    const timeout = setTimeout(() => {
      setDisplayed((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    }, 45); // 45ms per character — elegant speed, not too fast not too slow
    return () => clearTimeout(timeout);
  }, [index, text]);

  return (
    <span>
      {displayed}
      {index < text.length && (
        <span
          className="cursor"
          style={{
            borderRight: "1px solid currentColor",
            marginLeft: "1px",
            animation: "blink 0.8s step-end infinite",
          }}
        />
      )}
    </span>
  );
}

export function Hero({ excerpt, slug }: HeroProps) {
  const { theme } = useTheme();

  return (
    <section
      className={cn(
        "relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden hero-section",
        theme
      )}
    >
      {/* OVERLAY LAYER */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundColor: "var(--hero-overlay)" }}
      />

      {/* VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 z-0 cold-vignette" />

      <div className="relative z-10 container-reading flex flex-col items-center text-center -translate-y-10">
        <div className="max-w-[700px] flex flex-col items-center">
          <motion.p
            className="text-label-caps text-[var(--text-muted)] tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            EST. MMXXIV
          </motion.p>

          <motion.h1
            className="mt-8 text-display-lg text-[var(--text-primary)] font-normal tracking-tight leading-none whitespace-normal md:whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              textShadow:
                theme === "midnight-snowfall"
                  ? "0 2px 12px rgba(0,0,0,0.25)"
                  : "none",
            }}
          >
            The Akshansh Experience
          </motion.h1>

          <motion.div
            className="mt-8 w-24 h-[1px] bg-[var(--border-bright)]"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <div className="mt-12 w-full px-6 md:px-0 md:max-w-[480px] text-left min-h-[4rem]">
            {excerpt && (
              <motion.p
                className="body-reading italic"
                style={{ color: "var(--text-secondary)", maxWidth: "480px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                <TypewriterText text={excerpt} />
              </motion.p>
            )}

            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a
                href={slug ? `/poems/${slug}` : "/poems"}
                className="text-label-caps text-[var(--text-primary)] hover:text-[var(--accent)] transition-all duration-300 inline-flex items-center gap-3 border-b border-transparent hover:border-[var(--accent)] pb-1"
              >
                Read the Latest Poem <span>→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
