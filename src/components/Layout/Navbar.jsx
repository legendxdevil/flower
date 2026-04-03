import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../../lib/icons";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";

export const Navbar = ({ onFavoritesClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const favorites = useFavorites((state) => state.favorites);
  const favoriteCount = favorites.length;

  // navItems removed. Quote integrated instead.

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-brown-earth/80 to-pink-rose/50 backdrop-blur-md border-b border-brown-light/20 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto h-full px-lg flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="text-3xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🌹
          </motion.div>
          <span className="font-display text-2xl font-bold text-pink-rose">
            FLORIN
          </span>
        </motion.div>

        {/* Quote Center Piece */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <p className="font-display italic text-brown-dark/80 text-lg lg:text-xl tracking-tight">
            "Where flowers bloom so does hope"
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Favorites Button */}
          <motion.button
            className="relative p-sm rounded-full hover:bg-pink-light transition-colors"
            onClick={onFavoritesClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icons.Heart className="w-6 h-6 text-pink-rose" />
            {favoriteCount > 0 && (
              <motion.div
                className="absolute -top-1 -right-1 bg-pink-rose text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center pointer-events-none"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {favoriteCount}
              </motion.div>
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <Icons.X className="w-6 h-6 text-brown-dark" />
            ) : (
              <Icons.Menu className="w-6 h-6 text-brown-dark" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Simplified Quote only */}
      <motion.div
        className="absolute top-20 left-0 right-0 bg-accent-cream border-b border-brown-light/20 md:hidden overflow-hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-lg text-center">
          <p className="font-display italic text-brown-dark text-md">
            "Where flowers bloom so does hope"
          </p>
        </div>
      </motion.div>
    </motion.nav>
  );
};
