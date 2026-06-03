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
  type: "circle" | "flake";
}

export function SnowCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const { theme, atmosphere } = useTheme();
  const lightningRef = useRef({ intensity: 0, next: Date.now() + 4000 });

  useEffect(() => {
    // Only mount/run in dark mode and when atmosphere is not off
    if (theme === "winter-ivory" || atmosphere === "off") return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    };

    let { w, h } = resize();

    const isRain = atmosphere === "rain";
    const colorRGB = isRain ? "180, 195, 220" : "223, 226, 240";
    
    const isMobile = w < 768;
    const baseCount = isMobile ? 60 : Math.min(120, Math.max(80, Math.floor((w * h) / 16000)));
    const count = isRain ? (isMobile ? 80 : 140) : baseCount;

    const particles: Particle[] = Array.from({ length: count }, () => {
      if (isRain) {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1, 
          o: 0.15 + Math.random() * 0.2,
          vy: 8 + Math.random() * 6,
          sway: (Math.random() - 0.5) * 2,
          phase: 12 + Math.random() * 6,
          type: "circle"
        };
      }
      const type = Math.random() > 0.4 ? "flake" : "circle";
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: type === "circle" ? 1 + Math.random() * 1 : 1.5 + Math.random() * 1,
        o: 0.2 + Math.random() * 0.4,
        vy: 0.4 + Math.random() * 0.4,
        sway: 0.2 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        type
      };
    });

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", () => {
      const dims = resize();
      w = dims.w;
      h = dims.h;
    });

    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.005;
      const now = Date.now();
      
      if (isRain && now > lightningRef.current.next) {
        lightningRef.current.intensity = 1;
        lightningRef.current.next = now + 4000 + Math.random() * 4000;
      }
      if (lightningRef.current.intensity > 0) {
        if (lightningRef.current.intensity > 0.8) {
          lightningRef.current.intensity -= 0.05;
        } else {
          lightningRef.current.intensity -= 0.015;
        }
      }

      ctx.clearRect(0, 0, w, h);

      if (isRain && lightningRef.current.intensity > 0) {
        const alpha = 0.03 + (lightningRef.current.intensity * 0.09);
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
        ctx.fillRect(0, 0, w, h);
      }

      for (const p of particles) {
        if (!isRain) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 100 * 100) {
            const d = Math.sqrt(d2) || 1;
            const force = (100 - d) / 100;
            p.x += (dx / d) * force * 0.8;
            p.y += (dy / d) * force * 0.4;
          }
          p.x += Math.sin(t + p.phase) * p.sway;
        } else {
          p.x += p.sway * 0.5;
        }

        p.y += p.vy;
        
        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
        }
        if (p.x > w + 20) p.x = -20;
        if (p.x < -20) p.x = w + 20;

        if (isRain) {
          ctx.beginPath();
          const angle = -8 * (Math.PI / 180);
          const x2 = p.x + Math.sin(angle) * p.phase;
          const y2 = p.y + Math.cos(angle) * p.phase;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(${colorRGB}, ${p.o})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          if (p.type === "circle") {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colorRGB}, ${p.o})`;
            ctx.fill();
          } else {
            // Snowflake
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${colorRGB}, ${p.o})`;
            ctx.lineWidth = 0.5;
            for (let i = 0; i < 3; i++) {
              const ang = (i * 60) * (Math.PI / 180);
              const xoff = Math.cos(ang) * p.r * 1.5;
              const yoff = Math.sin(ang) * p.r * 1.5;
              ctx.moveTo(-xoff, -yoff);
              ctx.lineTo(xoff, yoff);
            }
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [theme, atmosphere]);

  if (theme === "winter-ivory" || atmosphere === "off") return null;

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
