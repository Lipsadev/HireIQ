"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  accentColor: string;
  delay?: number;
}

function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    v >= 1000 ? Math.round(v).toLocaleString() : Math.round(v).toString()
  );
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value, duration, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function StatCard({
  label,
  value,
  change,
  changeLabel,
  icon,
  accentColor,
  delay = 0,
}: StatCardProps) {
  const isPositive = change >= 0;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-5 group cursor-default relative overflow-hidden rounded-2xl backdrop-blur-md"
      style={{
        background: "rgba(var(--bg-card-rgb), 0.6)",
        border: `1px solid ${hovered ? `${accentColor}65` : "rgba(var(--gold-rgb),0.15)"}`,
        boxShadow: hovered
          ? `0 0 30px ${accentColor}38, 0 0 10px ${accentColor}20, 0 12px 40px rgba(0,0,0,0.55), 0 4px 24px rgba(0,0,0,0.4)`
          : "0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(var(--gold-rgb),0.1)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Background glow blob */}
      <div
        className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none blur-3xl"
        style={{
          background: accentColor,
          transform: "translate(35%, -35%)",
          opacity: hovered ? 0.18 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Bottom edge shimmer line */}
      <div
        className="absolute bottom-0 left-4 right-4 h-px rounded-full pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4 relative">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered ? `${accentColor}28` : `${accentColor}20`,
            border: `1px solid ${hovered ? `${accentColor}50` : `${accentColor}30`}`,
          }}
        >
          <div style={{ color: accentColor }}>{icon}</div>
        </div>
        <span
          className={cn(
            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
            isPositive
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          )}
        >
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {Math.abs(change)}%
        </span>
      </div>

      {/* Value */}
      <div className="text-3xl font-bold font-display text-slate-100 mb-1 relative">
        <AnimatedCounter value={value} />
      </div>

      {/* Label */}
      <p className="text-sm text-slate-400 font-medium">{label}</p>
      <p className="text-xs text-slate-600 mt-1">{changeLabel}</p>
    </motion.div>
  );
}
