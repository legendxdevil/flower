import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../../lib/icons";

export const FlowerCard = ({
  id,
  name,
  romanticMessage,
  imageUrl,
  meaning,
  season,
  isFavorite,
  onFavoriteClick,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="h-full rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-hover border border-brown-light/20 transition-all cursor-pointer group flex flex-col"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-pink-light to-brown-light">
        <motion.img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Overlay on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-pink-rose/40 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Season Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-md py-sm rounded-full pointer-events-none">
          <span className="font-ui text-xs font-semibold text-brown-dark">
            {season}
          </span>
        </div>

        {/* Favorite Button */}
        <motion.button
          className="absolute top-3 right-3 p-md bg-white/90 backdrop-blur-sm rounded-full hover:bg-pink-rose transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick(id);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icons.Heart
            className={`w-5 h-5 transition-all ${
              isFavorite
                ? "fill-pink-rose text-pink-rose"
                : "text-brown-dark group-hover:text-pink-rose"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-lg flex-1 flex flex-col">
        {/* Flower Name */}
        <h3 className="font-display text-2xl text-pink-rose mb-md font-bold transition-colors">
          {name}
        </h3>

        {/* Romantic Message */}
        <p className="font-body text-sm text-brown-dark/80 mb-lg line-clamp-2 italic">
          "{romanticMessage}"
        </p>

        {/* Meaning */}
        <div className="flex items-center gap-md mb-lg flex-1">
          <span className="font-ui text-xs text-brown-earth font-semibold uppercase tracking-wide">
            Meaning:
          </span>
          <span className="font-body text-sm text-brown-dark">{meaning}</span>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-md mt-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button className="flex-1 py-md px-sm bg-pink-rose/10 hover:bg-pink-rose/20 text-pink-rose font-ui text-sm font-semibold rounded-lg transition-colors">
            Read Story
          </button>
          <button className="py-md px-sm bg-brown-light/10 hover:bg-brown-light/20 text-brown-dark rounded-lg transition-colors">
            <Icons.Share2 className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
