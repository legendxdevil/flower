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
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <PaperTexture className="py-4xl bg-accent-cream/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-lg pt-xl" ref={ref}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-3xl text-center"
        >
          <h2 className="font-display text-4xl md:text-h2 text-pink-rose font-bold mb-lg">
            Discover Our Collection
          </h2>
          <p className="font-body text-lg text-brown-dark max-w-2xl mx-auto px-4">
            Each flower carries its own story of romance and meaning
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
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
      </div>
    </PaperTexture>
  );
});

FlowerGrid.displayName = 'FlowerGrid';
