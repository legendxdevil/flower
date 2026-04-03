import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../../lib/icons";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-10 left-10 z-[60] group flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          whileHover={{ y: -5 }}
        >
          <motion.div
            className="w-14 h-14 bg-white rounded-full shadow-deep border-2 border-pink-rose flex items-center justify-center relative overflow-hidden"
            animate={{ boxShadow: ["0 0 0px rgba(231, 84, 128, 0)", "0 0 20px rgba(231, 84, 128, 0.4)", "0 0 0px rgba(231, 84, 128, 0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span 
                className="text-2xl z-10"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
              🌸
            </motion.span>
            <div className="absolute inset-0 bg-pink-light opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
          <span className="font-ui text-[10px] font-bold text-pink-rose uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
            Scroll Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
