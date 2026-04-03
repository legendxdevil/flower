import React from "react";
import { motion } from "framer-motion";
import { Icons } from "../../lib/icons";
import { PaperTexture } from "../UI/PaperTexture";

const flowers = ["🌹", "🌷", "🌸", "🌼", "🌺", "💐"];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <PaperTexture className="relative w-full h-screen bg-gradient-to-br from-pink-light via-accent-cream to-brown-light/20 overflow-hidden">
      {/* Animated Background Elements */}
      {flowers.map((flower, index) => (
        <motion.div
          key={index}
          className="absolute text-5xl pointer-events-none"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: -100,
            opacity: 0,
          }}
          animate={{
            y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
            opacity: [0, 1, 0.5, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          {flower}
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-lg text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-xl px-lg py-sm bg-white/50 backdrop-blur-sm border border-pink-rose/20 rounded-full"
        >
          <span className="font-ui text-sm text-pink-rose font-semibold">
            ✨ Welcome to FLORIN ✨
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black text-pink-rose mb-lg tracking-tighter leading-none"
        >
          Indian Flowers of Romance
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-body text-xl md:text-h4 text-brown-dark mb-2xl max-w-2xl"
        >
          "Every flower tells a story of love. Discover the meanings, the
          beauty, and the romance hidden in nature's most perfect creations."
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex gap-lg flex-col sm:flex-row"
        >
          <motion.button
            onClick={onExplore}
            className="px-2xl py-lg bg-gradient-to-r from-pink-rose to-pink-accent text-white font-ui font-semibold rounded-xl shadow-hover hover:shadow-deep transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Gallery
          </motion.button>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 flex flex-col items-center cursor-pointer"
          onClick={onExplore}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-ui text-sm text-brown-earth/60 mb-md">
            Scroll to explore
          </span>
          <Icons.ChevronDown className="w-6 h-6 text-pink-rose" />
        </motion.div>
      </motion.div>
    </PaperTexture>
  );
};
