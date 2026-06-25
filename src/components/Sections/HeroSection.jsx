import React from "react";
import { motion } from "framer-motion";
import { Icons } from "../../lib/icons";
import { PaperTexture } from "../UI/PaperTexture";

const PetalIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C8 6 4 10 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-8-8-12zm0 18c-3.3 0-6-2.7-6-6 0-3 3.3-6.5 6-9 2.7 2.5 6 6 6 9 0 3.3-2.7 6-6 6z" />
  </svg>
);

export const HeroSection = ({ onExplore }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  // 12 floating petals
  const floatingPetals = Array.from({ length: 12 });

  return (
    <PaperTexture 
      className="relative w-full h-screen bg-brand-cream overflow-hidden"
      contentClassName="w-full h-full flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        src="/hero_bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-100"
      />
      
      {/* Background Watercolor Splatters / Paint Bleeds (behind cherry blossoms) */}
      {/* Top Left Watercolor Splash */}
      <div 
        className="absolute top-0 left-0 w-[95%] md:w-[85%] lg:w-[75%] max-w-[1150px] aspect-square pointer-events-none select-none z-0 opacity-80 blur-[40px]"
        style={{ transform: "translate(-78%, -25%)" }}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full fill-brand-pinkBg">
          <path d="M100,50 C240,10 380,80 410,190 C440,300 390,410 290,440 C190,470 70,390 40,280 C10,170 30,80 100,50 Z" />
        </svg>
      </div>

      {/* Top Right Watercolor Splash */}
      <div 
        className="absolute top-0 right-0 w-[100%] md:w-[90%] lg:w-[80%] max-w-[1250px] aspect-square pointer-events-none select-none z-0 opacity-80 blur-[40px]"
        style={{ transform: "translate(78%, -25%)" }}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full fill-brand-pinkBg">
          <path d="M150,50 C300,10 440,90 420,230 C400,370 290,420 180,380 C70,340 50,210 110,170 C170,130 90,80 150,50 Z" />
        </svg>
      </div>

      {/* Watercolor Cherry Blossom Corner Decorations */}
      {/* Top Left Cherry Blossoms */}
      <div 
        className="absolute top-0 left-0 w-[85%] md:w-[75%] lg:w-[70%] max-w-[1100px] pointer-events-none select-none z-10"
        style={{ transform: "translate(-80%, -20%)" }}
      >
        <img
          src="/flowers/cherry_blossom_frame.png"
          alt=""
          className="w-full h-full object-contain rotate-[-5deg] opacity-95"
        />
      </div>

      {/* Top Right Cherry Blossoms */}
      <div 
        className="absolute top-0 right-0 w-[92%] md:w-[82%] lg:w-[77%] max-w-[1200px] pointer-events-none select-none z-10"
        style={{ transform: "translate(80%, -20%)" }}
      >
        <img
          src="/flowers/cherry_blossom_frame.png"
          alt=""
          className="w-full h-full object-contain scale-x-[-1] rotate-[5deg] opacity-95"
        />
      </div>

      {/* Floating Petals Anim */}
      {floatingPetals.map((_, index) => {
        const startX = Math.random() * 100; // % width
        const duration = 8 + Math.random() * 6; // seconds
        const delay = Math.random() * 5;
        const size = 12 + Math.random() * 16; // px
        
        return (
          <motion.div
            key={index}
            className="absolute text-brand-rose/25 pointer-events-none z-10"
            style={{ left: `${startX}%`, top: -50 }}
            animate={{
              y: "110vh",
              x: ["0px", `${Math.sin(index) * 50}px`, "0px"],
              rotate: [0, 360],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear",
            }}
          >
            <PetalIcon style={{ width: size, height: size }} />
          </motion.div>
        );
      })}

      {/* Main Content */}
      <motion.div
        className="relative z-30 max-w-4xl px-lg text-center flex flex-col items-center mt-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title Split: Garden / Dreams */}
        <div className="flex flex-col items-center select-none">
          <motion.h1
            variants={itemVariants}
            className="font-display text-[6.5rem] sm:text-[9.5rem] md:text-[12rem] lg:text-[14.5rem] xl:text-[16rem] font-medium text-brand-rose leading-[0.8] tracking-tight"
          >
            Garden
          </motion.h1>
          <motion.h1
            variants={itemVariants}
            className="font-display text-[6.5rem] sm:text-[9.5rem] md:text-[12rem] lg:text-[14.5rem] xl:text-[16rem] font-medium text-brand-green leading-[0.9] tracking-tight mt-1"
          >
            Dreams
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-mustasurma text-[22px] sm:text-[26px] text-brand-rose/95 mt-6 normal-case max-w-xl leading-relaxed"
        >
          Made on Earth, designed with you in mind.
        </motion.p>

        {/* CTA Buttons (MORE, SHOP) */}
        <motion.div
          variants={itemVariants}
          className="flex gap-md mt-10 flex-row"
        >
          <motion.button
            onClick={onExplore}
            className="px-8 py-3 bg-brand-rose border border-brand-rose text-white font-ui font-bold text-[11px] tracking-[0.2em] rounded-full shadow-soft hover:shadow-hover hover:bg-brand-rose/95 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            MORE
          </motion.button>
          
          <motion.button
            onClick={onExplore}
            className="px-8 py-3 bg-transparent border border-brand-rose text-brand-rose font-ui font-bold text-[11px] tracking-[0.2em] rounded-full hover:bg-brand-pink-bg/25 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            SHOP
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute -bottom-24 md:-bottom-28 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity z-30"
          onClick={onExplore}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-brand-rose/60 mb-sm">
            Scroll to explore
          </span>
          <Icons.ChevronDown className="w-5 h-5 text-brand-rose/80" />
        </motion.div>
      </motion.div>
    </PaperTexture>
  );
};
