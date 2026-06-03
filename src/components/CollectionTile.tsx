import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Collection } from "@/data/poems";

interface Props {
  collection: Collection;
  index?: number;
}

const COLLECTION_THEMES: Record<string, { accent: string; wash: string }> = {
  winter: { 
    accent: "#a8b8d8", 
    wash: "rgba(168, 184, 216, 0.15)" 
  },
  collapse: { 
    accent: "#8a8a9a", 
    wash: "rgba(138, 138, 154, 0.15)" 
  },
  distance: { 
    accent: "#b8a8c8", 
    wash: "rgba(184, 168, 200, 0.15)" 
  },
  midnight: { 
    accent: "#8888b8", 
    wash: "rgba(136, 136, 184, 0.15)" 
  },
};

export function CollectionTile({ collection, index = 0 }: Props) {
  const theme = COLLECTION_THEMES[collection.slug] || { accent: "var(--accent)", wash: "rgba(0,0,0,0.05)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="relative group overflow-hidden transition-all duration-500 h-full min-h-[280px]"
      style={{
        backgroundColor: "var(--bg-surface-low)",
        backgroundImage: `radial-gradient(circle at center, ${theme.wash} 0%, transparent 75%)`,
      }}
    >
      {/* Left 'Spine' Accent Border */}
      <motion.div 
        className="absolute left-0 top-0 bottom-0 z-10" 
        initial={{ width: 4, opacity: 0.8 }}
        whileHover={{ width: 6, opacity: 1 }}
        style={{ backgroundColor: theme.accent }}
        transition={{ duration: 0.3 }}
      />

      <Link
        to="/collections/$slug"
        params={{ slug: collection.slug }}
        className="relative z-20 flex flex-col h-full p-10"
      >
        <div className="flex flex-col gap-2">
          {/* Decorative tiny rule */}
          <div 
            className="w-5 h-[1px] mb-2" 
            style={{ backgroundColor: theme.accent }} 
          />
          
          <span className="text-label-caps text-[var(--text-muted)] opacity-60 text-[10px]">
            Volume {index + 1}
          </span>
          
          <h3 className="text-display-md md:text-4xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mt-2">
            {collection.name}
          </h3>
          
          <p className="font-body italic text-[var(--text-muted)] text-[16px] leading-relaxed mt-4 max-w-[90%]">
            {collection.excerpt}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-end">
          <span className="text-label-caps text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-[10px]">
            Enter →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
