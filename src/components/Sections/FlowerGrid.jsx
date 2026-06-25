import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { FlowerCard } from "../Flowers/FlowerCard";
import { PaperTexture } from "../UI/PaperTexture";

export const FlowerGrid = forwardRef(({ flowers, favorites, onFavoriteClick, onFlowerClick }, ref) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 90, damping: 14 },
    },
  };

  return (
    <section
      ref={ref}
      id="best-sellers-section-inner"
      className="py-16 bg-brand-cream/20 relative overflow-hidden"
    >
      {/* Premium Backdrop Watercolor Blur Blobs */}
      <div className="absolute top-20 left-[-10%] w-[350px] h-[350px] bg-brand-pinkBg/40 rounded-full blur-[100px] pointer-events-none select-none z-0" />
      <div className="absolute bottom-20 right-[-10%] w-[400px] h-[400px] bg-brand-pinkBg/30 rounded-full blur-[120px] pointer-events-none select-none z-0" />

      <PaperTexture className="relative z-10 w-full">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 text-center px-6"
        >
          <h2 className="font-display text-4xl sm:text-h2 text-brand-rose font-medium tracking-[0.05em] mb-4">
            Collection for you
          </h2>
          <p className="font-body text-xs sm:text-sm text-brand-rose/65 max-w-2xl mx-auto leading-relaxed">
            A curated selection of our most cherished floral arrangements, handpicked to bring beauty,
            warmth, and joy into every moment of your life.
          </p>
        </motion.div>

        {/* Full-width Product Cards Grid — no side padding */}
        {flowers.length === 0 ? (
          <div className="py-12 text-center text-brand-rose/60 font-body italic text-sm">
            No products found in this category. Click a category again to show all.
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {flowers.map((flower) => (
              <motion.div key={flower.id} variants={itemVariants}>
                <FlowerCard
                  {...flower}
                  isFavorite={favorites.includes(flower.id)}
                  onFavoriteClick={onFavoriteClick}
                  onClick={() => onFlowerClick(flower)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </PaperTexture>
    </section>
  );
});

FlowerGrid.displayName = 'FlowerGrid';
