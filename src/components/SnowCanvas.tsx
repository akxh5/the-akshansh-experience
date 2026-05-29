import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Particle {
  x: number;
  y: number;
  r: number;
  o: number;
  vy: number;
  sway: number;
  phase: number;
}

export function SnowCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== "dark") return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = Math.min(110, Math.max(80, Math.floor((w * h) / 18000)));
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 2,
      o: 0.3 + Math.random() * 0.4,
      vy: 0.3 + Math.random() * 0.5,
      sway: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
    }));

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        // mouse scatter
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 80 * 80) {
          const d = Math.sqrt(d2) || 1;
          const force = (80 - d) / 80;
          p.x += (dx / d) * force * 1.2;
          p.y += (dy / d) * force * 0.6;
        }
        p.y += p.vy;
        p.x += Math.sin(t + p.phase) * p.sway * 0.3;
        if (p.y > h + 4) { p.y = -4; p.x = Math.random() * w; }
        if (p.x > w + 4) p.x = -4;
        if (p.x < -4) p.x = w + 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(223, 226, 240, ${p.o})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  if (theme !== "dark") return null;
  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
