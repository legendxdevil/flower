import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { FlowerCard } from "../Flowers/FlowerCard";
import { PaperTexture } from "../UI/PaperTexture";

export const FlowerGrid = forwardRef(({ flowers, favorites, onFavoriteClick, onFlowerClick, activeCategory }, ref) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
      id="best-sellers-section" 
      className="py-24 bg-brand-cream/20 relative overflow-hidden"
    >
      {/* Premium Backdrop Watercolor Blur Blobs */}
      <div className="absolute top-20 left-[-10%] w-[350px] h-[350px] bg-brand-pinkBg/40 rounded-full blur-[100px] pointer-events-none select-none z-0" />
      <div className="absolute bottom-20 right-[-10%] w-[400px] h-[400px] bg-brand-pinkBg/30 rounded-full blur-[120px] pointer-events-none select-none z-0" />

      <PaperTexture className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-lg">
          
          {/* Section Header */}
          {!activeCategory && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-16 text-center"
            >
              <h2 className="font-display text-4xl sm:text-h2 text-brand-rose font-medium tracking-[0.05em] uppercase mb-4">
                BEST-SELLERS
              </h2>
              <p className="font-body text-xs sm:text-sm text-brand-rose/65 max-w-2xl mx-auto px-lg leading-relaxed">
                Discover our Best Sellers, featuring the most popular and beloved floral arrangements.
                These favorites are sure to impress and delight for any occasion.
              </p>
            </motion.div>
          )}


          {/* Product Cards Grid */}
          {flowers.length === 0 ? (
            <div className="py-12 text-center text-brand-rose/60 font-body italic text-sm">
              No products found in this category. Click a category again to show all.
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12"
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
        </div>
      </PaperTexture>
    </section>
  );
});

FlowerGrid.displayName = 'FlowerGrid';
