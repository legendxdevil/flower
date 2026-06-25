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
      className="flex flex-col items-center cursor-pointer group select-none w-full"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Full-width image container — no padding, no circle */}
      <div className="relative w-full overflow-hidden">

        {/* Favorite Heart Button */}
        <motion.button
          className="absolute top-2 right-2 z-20 p-1.5 bg-white/80 shadow rounded-full text-brand-rose border border-brand-rose/10 hover:bg-brand-pinkBg/60 transition-colors backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick(id);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icons.Heart
            className={`w-3 h-3 transition-all ${
              isFavorite
                ? "fill-brand-rose text-brand-rose"
                : "text-brand-rose/60 group-hover:text-brand-rose"
            }`}
          />
        </motion.button>

        {/* Bouquet Image — fills full column width, edge to edge */}
        <motion.img
          src={imageUrl}
          alt={designerTitle || name}
          className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-[1.05] drop-shadow-sm"
          style={{ display: "block" }}
        />
      </div>

      {/* Text Details */}
      <div className="text-center w-full px-2 py-3">
        <span className="font-ui text-[9px] sm:text-[10px] tracking-[0.25em] text-brand-green uppercase font-semibold mb-1 block">
          {categoryLabel || "Collection"}
        </span>
        <h3 className="font-display text-base sm:text-lg text-brand-rose font-medium tracking-wide leading-tight">
          {designerTitle || name.split(" ")[0]}
        </h3>
      </div>
    </motion.div>
  );
};
