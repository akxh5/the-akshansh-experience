import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  centered?: boolean;
}

export function Divider({ className, centered = true }: DividerProps) {
  return (
    <div className={cn("w-full flex", centered ? "justify-center" : "justify-start", className)}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-[60px] h-px bg-[var(--border)] origin-center"
      />
    </div>
  );
}
