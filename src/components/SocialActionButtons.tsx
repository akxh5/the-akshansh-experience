import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Poem } from "@/data/poems";
import { Heart, Bookmark, Instagram, Send, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { toggleLike, toggleSave, getLikeCount, checkUserInteractions } from "@/lib/interactions";
import { supabase } from "@/lib/supabase";

interface SocialActionButtonsProps {
  poem: Poem;
}

export async function generateShareImage(poem: { title: string, excerpt: string, author: string }): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d')!;
  
  // Background
  ctx.fillStyle = '#0f131d';
  ctx.fillRect(0, 0, 1080, 1080);
  
  // Top accent line
  ctx.strokeStyle = '#c4d4f5';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 120);
  ctx.lineTo(300, 120);
  ctx.stroke();
  
  // Title
  ctx.fillStyle = '#dfe2f0';
  ctx.font = 'italic 64px Georgia, serif';
  ctx.fillText(poem.title, 80, 200);
  
  // Excerpt — wrap text
  ctx.fillStyle = '#8892aa';
  ctx.font = 'italic 36px Georgia, serif';
  const words = poem.excerpt.split(' ');
  let line = '';
  let y = 340;
  for (const word of words) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > 920 && line !== '') {
      ctx.fillText(line, 80, y);
      line = word + ' ';
      y += 56;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, 80, y);
  
  // Attribution
  ctx.fillStyle = '#c4d4f5';
  ctx.font = '28px Georgia, serif';
  ctx.fillText(`— ${poem.author}`, 80, 900);
  
  // Platform URL
  ctx.fillStyle = '#44474d';
  ctx.font = '22px Arial, sans-serif';
  ctx.fillText('the-akshansh-experience.com', 80, 980);
  
  return canvas.toDataURL('image/png');
}

export function SocialActionButtons({ poem }: SocialActionButtonsProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { location } = useRouterState();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      if (!supabase) return;

      // 1. Fetch TOTAL counts (Publicly accessible)
      const [likesRes, savesRes] = await Promise.all([
        supabase.from('likes').select('*', { count: 'exact', head: true }).eq('poem_slug', poem.slug),
        supabase.from('saves').select('*', { count: 'exact', head: true }).eq('poem_slug', poem.slug)
      ]);

      setLikeCount(likesRes.count || 0);
      setSaveCount(savesRes.count || 0);

      // 2. Fetch User-specific state (Auth required)
      if (user) {
        const { liked: userLiked, saved: userSaved } = await checkUserInteractions(user.id, poem.slug);
        setLiked(userLiked);
        setBookmarked(userSaved);
      }
    };

    loadStats();
  }, [poem.slug, user]);

  const handleAction = async (type: "like" | "save") => {
    if (!user) {
      navigate({ to: "/auth", search: { redirect: location.pathname } });
      return;
    }

    if (type === "like") {
      const originalLiked = liked;
      const originalCount = likeCount;
      
      // Optimistic update
      setLiked(!originalLiked);
      setLikeCount(prev => originalLiked ? prev - 1 : prev + 1);

      const { error } = await toggleLike(user.id, poem.slug);
      if (error) {
        toast.error("A small collapse: " + error.message);
        setLiked(originalLiked);
        setLikeCount(originalCount);
      }
    } else {
      const originalSaved = bookmarked;
      const originalSaveCount = saveCount;
      
      // Optimistic update
      setBookmarked(!originalSaved);
      setSaveCount(prev => originalSaved ? prev - 1 : prev + 1);

      const { error } = await toggleSave(user.id, poem.slug);
      if (error) {
        toast.error("A small collapse: " + error.message);
        setBookmarked(originalSaved);
        setSaveCount(originalSaveCount);
      } else {
        toast.success(bookmarked ? "Removed from your library." : "Stored in your library.");
      }
    }
  };

  const captureAndShare = async (platform: "instagram" | "twitter") => {
    if (platform === "twitter") {
      const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
      const tweetText = `"${poem.excerpt}" — ${poem.title} by ${poem.author}`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, "_blank");
      return;
    }

    setIsCapturing(true);
    const toastId = toast.loading("Composing snippet...");

    try {
      const dataUrl = await generateShareImage(poem);

      const link = document.createElement("a");
      link.download = `akshansh-${poem.slug}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("Image saved. Share it on Instagram.", { id: toastId });
    } catch (err) {
      console.error("Failed to capture image", err);
      toast.error("The snippet refused to render.", { id: toastId });
    } finally {
      setIsCapturing(false);
    }
  };

  const copyLink = async () => {
    if (typeof window !== "undefined") {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied.");
    }
  };

  return (
    <div className="mt-10 flex flex-wrap items-center gap-8 text-[var(--text-muted)]">
      <button
        onClick={() => handleAction("like")}
        className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors group"
      >
        <motion.span
          animate={{ scale: liked ? [1, 1.25, 1] : 1 }}
          transition={{ duration: 0.35 }}
          className="inline-block"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            fill={liked ? "currentColor" : "none"}
            className={liked ? "text-red-400/80" : ""}
          />
        </motion.span>
        <span className="text-label-caps">{likeCount}</span>
      </button>

      <button
        onClick={() => handleAction("save")}
        className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors group"
        aria-label="Bookmark"
      >
        <Bookmark
          size={16}
          strokeWidth={1.5}
          fill={bookmarked ? "currentColor" : "none"}
          className={bookmarked ? "text-[var(--accent)]" : ""}
        />
        <span className="text-label-caps">{saveCount}</span>
      </button>

      <div className="h-4 w-px bg-[var(--border)] opacity-20 hidden md:block" />

      <button
        onClick={() => captureAndShare("instagram")}
        disabled={isCapturing}
        className="flex items-center gap-2 text-label-caps hover:text-[var(--text-primary)] transition-colors disabled:opacity-50"
      >
        <Instagram size={16} strokeWidth={1.5} />
        <span>Instagram</span>
      </button>

      <button
        onClick={() => captureAndShare("twitter")}
        disabled={isCapturing}
        className="flex items-center gap-2 text-label-caps hover:text-[var(--text-primary)] transition-colors disabled:opacity-50"
      >
        <Send size={16} strokeWidth={1.5} />
        <span>Twitter</span>
      </button>

      <button
        onClick={copyLink}
        className="flex items-center gap-2 text-label-caps hover:text-[var(--text-primary)] transition-colors"
      >
        <LinkIcon size={16} strokeWidth={1.5} />
        <span>Copy Link</span>
      </button>
    </div>
  );
}
