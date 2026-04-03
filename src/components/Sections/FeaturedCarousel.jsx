import React from "react";
import { motion } from "framer-motion";
import { Icons } from "../../lib/icons";
import { PaperTexture } from "../UI/PaperTexture";

export const FeaturedCarousel = ({ flowers, favorites, onFavoriteClick, onFlowerClick }) => {
  // Only show the first 3-5 flowers as featured
  const featured = flowers.slice(0, 5);

  return (
    <div className="py-20 overflow-hidden bg-accent-cream/50 relative">
      <div className="max-w-7xl mx-auto px-lg mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="font-display text-4xl text-pink-rose font-bold mb-4">
              Featured This Week
            </h2>
            <p className="font-body text-brown-dark/70 max-w-lg">
              A curated selection of nature's most romantic masterpieces, chosen for their deep meaning and timeless beauty.
            </p>
          </div>
          <div className="flex items-center gap-2 text-brown-earth font-ui font-bold text-sm uppercase tracking-widest group cursor-pointer hover:text-pink-rose transition-colors">
            View All Collection <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="flex gap-8 overflow-x-auto px-[max(calc((100vw-80rem)/2),1.5rem)] pb-12 no-scrollbar snap-x snap-mandatory">
        {featured.map((flower, index) => (
          <motion.div
            key={flower.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-[300px] md:w-[400px] snap-center"
          >
            <div 
              className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 cursor-pointer border-2 border-brown-light/20"
              onClick={() => onFlowerClick(flower)}
            >
              {/* Paper Texture */}
              <PaperTexture className="absolute inset-0 z-10 opacity-10 pointer-events-none" />

              {/* Image */}
              <img 
                src={flower.imageUrl} 
                alt={flower.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/20 to-transparent z-10" />

              {/* Favorite Button */}
              <motion.button
                className="absolute top-6 right-6 z-20 p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavoriteClick(flower.id);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icons.Heart className={`w-6 h-6 ${favorites.includes(flower.id) ? "fill-pink-rose text-pink-rose" : "text-brown-dark"}`} />
              </motion.button>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="font-ui text-xs font-bold text-pink-accent uppercase tracking-widest mb-3 block">
                    {flower.season}
                  </span>
                  <h3 className="font-display text-3xl text-white font-bold mb-4">
                    {flower.name}
                  </h3>
                  <p className="font-body text-sm text-white/80 line-clamp-2 italic mb-6">
                    "{flower.romanticMessage}"
                  </p>
                  <button className="flex items-center gap-2 font-ui text-xs font-bold text-white uppercase tracking-widest group/btn">
                    Read Story <span className="w-8 h-px bg-pink-rose group-hover/btn:w-12 transition-all" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Floating Elements */}
      <motion.div 
        className="absolute top-20 right-10 text-6xl opacity-10 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        🌸
      </motion.div>
    </div>
  );
};
