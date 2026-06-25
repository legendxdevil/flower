import React from "react";
import { motion } from "framer-motion";
import { Icons } from "../../lib/icons";

export const FlowerCard = ({
  id,
  name,
  imageUrl,
  meaning,
  season,
  isFavorite,
  onFavoriteClick,
  onClick,
  category,
  categoryLabel,
  designerTitle,
  price,
  originalPrice,
}) => {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group select-none py-4"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Visual Image Area with Circular Backdrop */}
      <div className="relative w-full aspect-square max-w-[240px] flex items-center justify-center mb-5">
        
        {/* Soft Pink Circle Backdrop (Layered behind) */}
        <div className="absolute w-[72%] h-[72%] rounded-full bg-brand-pinkBg z-0 transition-all duration-500 group-hover:scale-105 group-hover:bg-brand-pinkBg/90 shadow-sm" />

        {/* Flower Bouquet Image */}
        <motion.img
          src={imageUrl}
          alt={designerTitle || name}
          className="w-[85%] h-[85%] object-contain z-10 transition-all duration-500 group-hover:translate-y-[-8px] group-hover:scale-[1.04]"
        />

        {/* Favorite Heart Button - positioned at the top-right edge of the circle backdrop */}
        <motion.button
          className="absolute top-[14%] right-[14%] z-20 p-2 bg-white shadow-soft rounded-full text-brand-rose border border-brand-rose/10 hover:bg-brand-pinkBg/50 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick(id);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icons.Heart
            className={`w-3.5 h-3.5 transition-all ${
              isFavorite
                ? "fill-brand-rose text-brand-rose"
                : "text-brand-rose/60 group-hover:text-brand-rose"
            }`}
          />
        </motion.button>
      </div>

      {/* Product Details Section */}
      <div className="text-center w-full px-sm">
        {/* Category / Occasion */}
        <span className="font-ui text-[10px] sm:text-[11px] tracking-[0.25em] text-brand-green uppercase font-semibold mb-1.5 block">
          {categoryLabel || "Collection"}
        </span>

        {/* Designer Serif Title */}
        <h3 className="font-display text-lg sm:text-[21px] text-brand-rose font-medium tracking-wide mb-1 transition-colors leading-tight">
          {designerTitle || name.split(" ")[0]}
        </h3>

        {/* Price Tag */}
        <div className="font-ui text-[14px] sm:text-[16px] font-bold text-gray-800 flex items-center justify-center gap-2">
          <span>${price || 100}</span>
          {originalPrice && (
            <span className="text-gray-400 font-normal line-through text-[12px]">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
