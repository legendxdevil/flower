import React from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { Icons } from "../../lib/icons";

const PetalIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M12 2C8 6 4 10 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-8-8-12zm0 18c-3.3 0-6-2.7-6-6 0-3 3.3-6.5 6-9 2.7 2.5 6 6 6 9 0 3.3-2.7 6-6 6z" />
  </svg>
);

export const HeroSection = ({ onExplore, scrollYProgress }) => {
  const fallbackProgress = useMotionValue(0);
  const progress = scrollYProgress ?? fallbackProgress;

  // Only parallax the video and blossoms — text stays fully opaque
  const yVideo        = useTransform(progress, [0, 1], ["0%", "20%"]);
  const xBlossomLeft  = useTransform(progress, [0, 0.5], ["-80%", "-105%"]);
  const yBlossomLeft  = useTransform(progress, [0, 0.5], ["-20%", "-35%"]);
  const xBlossomRight = useTransform(progress, [0, 0.5], ["80%", "105%"]);
  const yBlossomRight = useTransform(progress, [0, 0.5], ["-20%", "-35%"]);

  const petals = Array.from({ length: 10 });

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
    >
      {/* ── 1. Video background ── */}
      <motion.video
        src="/hero_bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ y: yVideo }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* ── 2. Dark scrim — guarantees text contrast ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none" />

      {/* ── 2b. Subtle white tint overlay at the top for navbar contrast ── */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent pointer-events-none z-[1]" />

      {/* ── 3. Watercolor blush blobs (purely decorative) ── */}
      <div
        className="absolute top-0 left-0 w-[75%] max-w-[900px] aspect-square pointer-events-none select-none opacity-40 blur-[50px]"
        style={{ transform: "translate(-60%, -20%)" }}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full fill-brand-pinkBg">
          <path d="M100,50 C240,10 380,80 410,190 C440,300 390,410 290,440 C190,470 70,390 40,280 C10,170 30,80 100,50 Z" />
        </svg>
      </div>
      <div
        className="absolute top-0 right-0 w-[75%] max-w-[900px] aspect-square pointer-events-none select-none opacity-40 blur-[50px]"
        style={{ transform: "translate(60%, -20%)" }}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full fill-brand-pinkBg">
          <path d="M150,50 C300,10 440,90 420,230 C400,370 290,420 180,380 C70,340 50,210 110,170 C170,130 90,80 150,50 Z" />
        </svg>
      </div>

      {/* ── 4. Cherry blossom frames (parallax outward on scroll) ── */}
      <motion.div
        className="absolute top-0 left-0 w-[70%] max-w-[1000px] pointer-events-none select-none"
        style={{ x: xBlossomLeft, y: yBlossomLeft }}
      >
        <img
          src="/flowers/cherry_blossom_frame.png"
          alt=""
          className="w-full h-full object-contain rotate-[-5deg]"
        />
      </motion.div>
      <motion.div
        className="absolute top-0 right-0 w-[75%] max-w-[1050px] pointer-events-none select-none"
        style={{ x: xBlossomRight, y: yBlossomRight }}
      >
        <img
          src="/flowers/cherry_blossom_frame.png"
          alt=""
          className="w-full h-full object-contain scale-x-[-1] rotate-[5deg]"
        />
      </motion.div>

      {/* ── 5. Floating petals ── */}
      {petals.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-brand-rose/30 pointer-events-none"
          style={{ left: `${8 + i * 9}%`, top: -30 }}
          animate={{ y: "110vh", x: [`0px`, `${Math.sin(i) * 40}px`, `0px`], rotate: [0, 360] }}
          transition={{ duration: 9 + i * 0.7, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
        >
          <PetalIcon size={14 + (i % 4) * 5} />
        </motion.div>
      ))}

      {/* ── 6. Hero text — always visible, no scroll-driven opacity ── */}
      <motion.div
        className="relative z-10 max-w-5xl px-6 text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
      >
        {/* "Garden" */}
        <motion.h1
          className="font-display font-medium text-white leading-[0.85] tracking-tight select-none"
          style={{
            fontSize: "clamp(5rem, 14vw, 16rem)",
            textShadow: "0 2px 20px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Garden
        </motion.h1>

        {/* "Dreams" */}
        <motion.h1
          className="font-display font-medium text-brand-pinkBg leading-[0.9] tracking-tight select-none mt-1"
          style={{
            fontSize: "clamp(5rem, 14vw, 16rem)",
            textShadow: "0 2px 20px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Dreams
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-mustasurma text-white/90 mt-5 normal-case max-w-lg leading-relaxed"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
            textShadow: "0 1px 8px rgba(0,0,0,0.7)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          Made on Earth, designed with you in mind.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-1 cursor-pointer opacity-60 hover:opacity-90 transition-opacity"
          onClick={onExplore}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65, y: [0, 7, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.6 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
          }}
        >
          <span
            className="font-ui text-[10px] tracking-[0.25em] uppercase text-white/80"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            Scroll to explore
          </span>
          <Icons.ChevronDown className="w-5 h-5 text-white/80" />
        </motion.div>
      </motion.div>
    </div>
  );
};
