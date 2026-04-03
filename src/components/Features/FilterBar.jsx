import React from "react";
import { motion } from "framer-motion";
import { Icons } from "../../lib/icons";

export const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  activeFilter, 
  setActiveFilter, 
  activeColor, 
  setActiveColor 
}) => {
  const seasons = ["All", "Spring", "Summer", "Monsoon", "Winter", "Year-round"];
  const colors = ["All", "Pink", "Red", "White", "Yellow", "Orange", "Magenta", "Purple"];

  return (
    <div className="bg-white/40 backdrop-blur-md border border-brown-light/20 rounded-2xl p-6 shadow-soft mb-12">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
        
        {/* Search section removed */}

        {/* Season Filter */}
        <div className="w-full lg:w-auto flex flex-wrap items-center gap-3">
          <span className="font-ui text-xs font-bold text-brown-earth uppercase tracking-widest mr-2 flex items-center gap-2">
            <Icons.Filter className="w-4 h-4 text-pink-rose" /> Filter by Season:
          </span>
          <div className="flex flex-wrap gap-2">
            {seasons.map((season) => (
              <motion.button
                key={season}
                onClick={() => setActiveFilter(season)}
                className={`px-4 py-2 rounded-lg font-ui text-sm font-semibold transition-all border shadow-sm ${
                  activeFilter === season 
                  ? "bg-pink-rose text-white border-pink-rose shadow-glow" 
                  : "bg-white text-brown-dark border-brown-light/10 hover:bg-pink-light"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {season}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Color Filter (Dropdown or Buttons) */}
        <div className="w-full lg:w-auto flex flex-wrap items-center gap-3">
          <span className="font-ui text-xs font-bold text-brown-earth uppercase tracking-widest mr-2">
            By Color:
          </span>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <motion.button
                key={color}
                onClick={() => setActiveColor(color)}
                className={`px-3 py-2 rounded-lg font-ui text-xs font-semibold transition-all border shadow-sm ${
                  activeColor === color 
                  ? "bg-brown-dark text-white border-brown-dark" 
                  : "bg-white text-brown-dark border-brown-light/10 hover:bg-brown-light/10"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {color}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
