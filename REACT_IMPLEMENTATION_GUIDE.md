# 🌹 ROMANTIC FLOWER WEBSITE - REACT IMPLEMENTATION GUIDE
## Complete Code Snippets & Component Templates

---

## 📚 TABLE OF CONTENTS

1. Tailwind Config Setup
2. Component Templates
3. Animation Patterns
4. Data Structure
5. Custom Hooks
6. Complete Feature Examples

---

## 1️⃣ TAILWIND.CONFIG.JS SETUP

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          rose: "#E75480",
          light: "#F5E6E8",
          accent: "#FF69B4",
          50: "#FDF2F8",
          100: "#FCE7F3",
          200: "#FBCFE8",
          300: "#F8B4D6",
          400: "#F472B6",
          500: "#EC4899",
          600: "#DB2777",
          700: "#BE185d",
          800: "#9D174D",
          900: "#831843",
        },
        brown: {
          earth: "#6B4423",
          light: "#D4A574",
          dark: "#3E2723",
          50: "#FDF4EE",
          100: "#FAEAD5",
          200: "#F5D5B8",
          300: "#EFC9A1",
          400: "#E8AD7E",
          500: "#E0935D",
          600: "#D4783E",
          700: "#B85C25",
          800: "#96471C",
          900: "#7A3818",
        },
        accent: {
          gold: "#D4AF37",
          cream: "#FFFAF0",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Merriweather", "serif"],
        ui: ["Poppins", "sans-serif"],
      },
      fontSize: {
        h1: ["72px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["48px", { lineHeight: "1.3", fontWeight: "700" }],
        h3: ["32px", { lineHeight: "1.4", fontWeight: "600" }],
        h4: ["24px", { lineHeight: "1.5", fontWeight: "600" }],
        h5: ["18px", { lineHeight: "1.5", fontWeight: "600" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.08)",
        card: "0 8px 24px rgba(0, 0, 0, 0.1)",
        hover: "0 20px 40px rgba(231, 84, 128, 0.15)",
        deep: "0 30px 60px rgba(0, 0, 0, 0.3)",
        glow: "0 0 30px rgba(231, 84, 128, 0.3)",
      },
      backgroundImage: {
        "paper-texture": "url('data:image/svg+xml,...')",
        "gradient-pink-brown":
          "linear-gradient(135deg, #E75480 0%, #D4A574 100%)",
        "gradient-subtle":
          "linear-gradient(135deg, rgba(231, 84, 128, 0.05) 0%, rgba(212, 175, 116, 0.05) 100%)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        beat: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1)" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(231, 84, 128, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(231, 84, 128, 0.8)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in",
        slideUp: "slideUp 0.6s ease-out",
        float: "float 4s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        beat: "beat 0.6s ease-in-out",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

---

## 2️⃣ COMPONENT TEMPLATES

### A. PaperTexture Wrapper Component

```javascript
// src/components/UI/PaperTexture.jsx
import React from "react";

export const PaperTexture = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* SVG Texture Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="paperNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale="1"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          filter="url(#paperNoise)"
          fill="currentColor"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
```

### B. Navbar Component

```javascript
// src/components/Layout/Navbar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ favoriteCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = ["Home", "Gallery", "Stories", "About", "Contact"];

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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-xl">
          {navItems.map((item, index) => (
            <motion.button
              key={item}
              className="font-ui text-sm font-medium text-brown-dark hover:text-pink-rose transition-colors relative group"
              whileHover={{ y: -2 }}
              onClick={() => navigate(`/${item.toLowerCase()}`)}
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-pink-rose"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Favorites Button */}
        <motion.button
          className="relative p-sm rounded-full hover:bg-pink-light transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="w-6 h-6 text-pink-rose" />
          {favoriteCount > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 bg-pink-rose text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
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
            <X className="w-6 h-6 text-brown-dark" />
          ) : (
            <Menu className="w-6 h-6 text-brown-dark" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="absolute top-20 left-0 right-0 bg-accent-cream border-b border-brown-light/20 md:hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-2 p-lg">
          {navItems.map((item) => (
            <button
              key={item}
              className="text-left p-md hover:bg-pink-light rounded-lg transition-colors"
              onClick={() => {
                navigate(`/${item.toLowerCase()}`);
                setIsOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};
```

### C. Hero Section Component

```javascript
// src/components/Sections/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PaperTexture } from "../UI/PaperTexture";

const flowers = ["🌹", "🌷", "🌸", "🌼", "🌺", "💐"];

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <PaperTexture className="relative w-full h-screen bg-gradient-to-br from-pink-light via-accent-cream to-brown-light/20 overflow-hidden">
      {/* Animated Background Elements */}
      {flowers.map((flower, index) => (
        <motion.div
          key={index}
          className="absolute text-5xl pointer-events-none"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -100,
            opacity: 0,
          }}
          animate={{
            y: window.innerHeight + 100,
            opacity: [0, 1, 0.5, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          {flower}
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-lg max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-xl px-lg py-sm bg-white/50 backdrop-blur-sm border border-pink-rose/20 rounded-full"
        >
          <span className="font-ui text-sm text-pink-rose font-semibold">
            ✨ Welcome to FLORIN ✨
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-h1 font-bold text-pink-rose mb-lg"
        >
          Indian Flowers of Romance
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-body text-h4 text-brown-dark mb-2xl max-w-2xl"
        >
          "Every flower tells a story of love. Discover the meanings, the
          beauty, and the romance hidden in nature's most perfect creations."
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex gap-lg flex-col sm:flex-row"
        >
          <motion.button
            className="px-2xl py-lg bg-gradient-to-r from-pink-rose to-pink-accent text-white font-ui font-semibold rounded-xl shadow-hover hover:shadow-deep transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Gallery
          </motion.button>

          <motion.button
            className="px-2xl py-lg border-2 border-brown-earth text-brown-earth font-ui font-semibold rounded-xl hover:bg-brown-light/10 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Save Favorites
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4xl flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-ui text-sm text-brown-earth/60 mb-md">
            Scroll to explore
          </span>
          <ChevronDown className="w-6 h-6 text-pink-rose" />
        </motion.div>
      </motion.div>
    </PaperTexture>
  );
};
```

### D. Flower Card Component

```javascript
// src/components/Flowers/FlowerCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Share2 } from "lucide-react";

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
      className="h-full rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-hover border border-brown-light/20 transition-all cursor-pointer group"
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
          className="absolute inset-0 bg-gradient-to-t from-pink-rose/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Season Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-md py-sm rounded-full">
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
          <Heart
            className={`w-5 h-5 transition-all ${
              isFavorite
                ? "fill-pink-rose text-pink-rose"
                : "text-brown-dark"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-lg">
        {/* Flower Name */}
        <h3 className="font-display text-h4 text-pink-rose mb-md font-bold">
          {name}
        </h3>

        {/* Romantic Message */}
        <p className="font-body text-sm text-brown-dark/80 mb-lg line-clamp-2">
          "{romanticMessage}"
        </p>

        {/* Meaning */}
        <div className="flex items-center gap-md mb-lg">
          <span className="font-ui text-xs text-brown-earth font-semibold">
            Meaning:
          </span>
          <span className="font-body text-sm text-brown-dark">{meaning}</span>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button className="flex-1 py-md px-sm bg-pink-rose/10 hover:bg-pink-rose/20 text-pink-rose font-ui text-sm font-semibold rounded-lg transition-colors">
            Learn More
          </button>
          <button className="py-md px-sm bg-brown-light/10 hover:bg-brown-light/20 text-brown-dark rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
```

### E. Flower Grid Component

```javascript
// src/components/Sections/FlowerGrid.jsx
import React from "react";
import { motion } from "framer-motion";
import { FlowerCard } from "../Flowers/FlowerCard";
import { PaperTexture } from "../UI/PaperTexture";

export const FlowerGrid = ({
  flowers,
  favorites,
  onFavoriteClick,
  onFlowerClick,
  showTitle = true,
}) => {
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
    <PaperTexture className="py-4xl bg-accent-cream/50">
      <div className="max-w-7xl mx-auto px-lg">
        {/* Title */}
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-3xl text-center"
          >
            <h2 className="font-display text-h2 text-pink-rose font-bold mb-lg">
              Discover Our Collection
            </h2>
            <p className="font-body text-lg text-brown-dark max-w-2xl mx-auto">
              Each flower carries its own story of romance and meaning
            </p>
          </motion.div>
        )}

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {flowers.map((flower) => (
            <motion.div
              key={flower.id}
              variants={itemVariants}
            >
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
};
```

### F. Favorites Sidebar Component

```javascript
// src/components/Features/FavoritesSidebar.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2 } from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";

export const FavoritesSidebar = ({ isOpen, onClose, flowers }) => {
  const { favorites, removeFavorite } = useFavorites();

  const favoriteFlowers = flowers.filter((f) =>
    favorites.includes(f.id)
  );

  const sidebarVariants = {
    hidden: { x: 400, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 400, opacity: 0 },
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-96 bg-accent-cream border-l-2 border-brown-light/30 shadow-deep z-50 flex flex-col"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-lg border-b border-brown-light/20">
              <h3 className="font-display text-h4 text-pink-rose font-bold">
                ♥ My Favorites
              </h3>
              <button
                onClick={onClose}
                className="p-sm hover:bg-pink-light rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-brown-dark" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-lg">
              {favoriteFlowers.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="text-5xl mb-lg">🌹</span>
                  <p className="font-body text-brown-dark">
                    No favorites yet. Start adding your favorite flowers!
                  </p>
                </div>
              ) : (
                <div className="space-y-md">
                  {favoriteFlowers.map((flower, index) => (
                    <motion.div
                      key={flower.id}
                      className="bg-white rounded-lg p-md flex items-center justify-between border border-brown-light/20 hover:shadow-soft transition-all"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-1">
                        <p className="font-body font-semibold text-brown-dark">
                          {flower.name}
                        </p>
                        <p className="font-ui text-xs text-brown-earth/60">
                          {flower.meaning}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFavorite(flower.id)}
                        className="ml-md p-sm hover:bg-pink-light rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-brown-dark" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {favoriteFlowers.length > 0 && (
              <div className="p-lg border-t border-brown-light/20 space-y-md">
                <button className="w-full py-lg px-md bg-gradient-to-r from-pink-rose to-pink-accent text-white font-ui font-semibold rounded-lg hover:shadow-hover transition-all flex items-center justify-center gap-md">
                  <Share2 className="w-4 h-4" />
                  Share Favorites
                </button>
                <button className="w-full py-lg px-md border-2 border-brown-earth text-brown-dark font-ui font-semibold rounded-lg hover:bg-brown-light/10 transition-all flex items-center justify-center gap-md">
                  <Download className="w-4 h-4" />
                  Download List
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
```

---

## 3️⃣ ANIMATION PATTERNS

### Scroll-Triggered Animation Hook

```javascript
// src/hooks/useScrollTrigger.js
import { useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

export const useScrollTrigger = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls };
};
```

### Stagger Container Pattern

```javascript
// src/components/Animations/StaggerContainer.jsx
import { motion } from "framer-motion";

export const StaggerContainer = ({ children, delay = 0 }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { variants: itemVariants })
      )}
    </motion.div>
  );
};
```

### Heart Animation

```javascript
// Animation snippet for heart beat
const heartAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

// Usage in JSX
<motion.button {...heartAnimation}>
  <Heart className="w-6 h-6" />
</motion.button>
```

---

## 4️⃣ DATA STRUCTURE

### Flower Data Format

```javascript
// src/lib/flowers.js
export const flowerData = [
  {
    id: 1,
    name: "Rose",
    romanticMessage:
      "You are the poetry of my heart, the rhythm of my soul.",
    meaning: "Love, passion, eternal devotion",
    season: "Oct - Mar",
    color: "Pink & Red",
    imageUrl: "/flowers/rose.jpg",
    fullDescription:
      "Roses are the most iconic symbol of love and romance...",
    symbolism:
      "Deep pink roses = admiration, red = passionate love",
    funFact:
      "India produces world-class roses in Bangalore",
    care: "Keep in cool water, change daily",
    bloomSize: "Large",
  },
  {
    id: 2,
    name: "Jasmine",
    romanticMessage:
      "Your grace lights up even the darkest night of my soul.",
    meaning: "Grace, elegance, sweetness",
    season: "Year-round",
    color: "White",
    imageUrl: "/flowers/jasmine.jpg",
    fullDescription: "Jasmine flowers are known for their intoxicating fragrance...",
    symbolism:
      "Pure white = innocence, gold center = richness",
    funFact:
      "National flower essence of several Indian regions",
    care: "Loves sunlight and humidity",
    bloomSize: "Small",
  },
  // ... 10 more flowers
];

export const getFlowerById = (id) =>
  flowerData.find((f) => f.id === id);

export const getFlowersByColor = (color) =>
  flowerData.filter((f) =>
    f.color.toLowerCase().includes(color.toLowerCase())
  );

export const getFlowersBySeason = (season) =>
  flowerData.filter((f) =>
    f.season.toLowerCase().includes(season.toLowerCase())
  );
```

---

## 5️⃣ CUSTOM HOOKS

### useFavorites Hook

```javascript
// src/hooks/useFavorites.js
import { useState, useEffect } from "react";

const FAVORITES_KEY = "florin_favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};
```

### useResponsive Hook

```javascript
// src/hooks/useResponsive.js
import { useState, useEffect } from "react";

export const useResponsive = () => {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setDeviceType("mobile");
      else if (width < 1024) setDeviceType("tablet");
      else setDeviceType("desktop");
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    deviceType,
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isDesktop: deviceType === "desktop",
  };
};
```

---

## 6️⃣ COMPLETE FEATURE EXAMPLES

### Feature 1: Search & Filter

```javascript
// src/components/Features/SearchBar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

export const SearchBar = ({ flowers, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);

    if (value.trim()) {
      const filtered = flowers.filter(
        (flower) =>
          flower.name.toLowerCase().includes(value.toLowerCase()) ||
          flower.meaning.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      onSearch(filtered);
    } else {
      setResults([]);
      onSearch(flowers);
    }
  };

  return (
    <motion.div
      className="relative max-w-2xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <Search className="absolute left-lg top-1/2 -translate-y-1/2 w-5 h-5 text-brown-earth pointer-events-none" />

        <input
          type="text"
          placeholder="Search flowers by name or meaning..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-4xl pr-lg py-lg bg-white border-2 border-brown-light/30 rounded-xl focus:border-pink-rose focus:outline-none font-body text-brown-dark transition-colors"
        />

        {searchTerm && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-lg top-1/2 -translate-y-1/2"
          >
            <X className="w-5 h-5 text-brown-earth hover:text-pink-rose transition-colors" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {searchTerm && results.length > 0 && (
        <motion.div
          className="absolute top-full left-0 right-0 mt-md bg-white border-2 border-brown-light/30 rounded-xl shadow-deep z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="max-h-96 overflow-y-auto">
            {results.map((flower) => (
              <motion.div
                key={flower.id}
                className="p-md border-b border-brown-light/10 hover:bg-pink-light/50 cursor-pointer transition-colors"
                whileHover={{ x: 5 }}
              >
                <p className="font-semibold text-brown-dark">{flower.name}</p>
                <p className="text-sm text-brown-earth">{flower.meaning}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
```

### Feature 2: Flower Detail Modal

```javascript
// src/components/Flowers/FlowerModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";

export const FlowerModal = ({
  isOpen,
  flower,
  isFavorite,
  onClose,
  onFavoriteClick,
  onNavigate,
}) => {
  if (!flower) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 sm:inset-8 lg:inset-12 bg-accent-cream rounded-2xl shadow-deep overflow-hidden z-50 flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-lg border-b border-brown-light/20">
              <h2 className="font-display text-h3 text-pink-rose font-bold">
                {flower.name}
              </h2>
              <button
                onClick={onClose}
                className="p-md hover:bg-pink-light rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-brown-dark" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg p-lg">
                {/* Image */}
                <div className="flex items-center justify-center">
                  <motion.img
                    src={flower.imageUrl}
                    alt={flower.name}
                    className="w-full max-w-md h-auto rounded-xl object-cover"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                  />
                </div>

                {/* Details */}
                <div className="space-y-lg">
                  {/* Romantic Message */}
                  <div className="bg-gradient-to-r from-pink-rose/10 to-brown-light/10 p-lg rounded-xl border border-pink-rose/20">
                    <p className="font-body text-lg text-brown-dark italic">
                      "{flower.romanticMessage}"
                    </p>
                  </div>

                  {/* Info */}
                  <div className="space-y-md">
                    <div>
                      <p className="font-ui text-xs uppercase text-brown-earth font-bold mb-sm">
                        Meaning
                      </p>
                      <p className="font-body text-brown-dark">
                        {flower.meaning}
                      </p>
                    </div>

                    <div>
                      <p className="font-ui text-xs uppercase text-brown-earth font-bold mb-sm">
                        Symbolism
                      </p>
                      <p className="font-body text-brown-dark">
                        {flower.symbolism}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-md">
                      <div>
                        <p className="font-ui text-xs uppercase text-brown-earth font-bold mb-sm">
                          Best Season
                        </p>
                        <p className="font-body text-brown-dark">
                          {flower.season}
                        </p>
                      </div>
                      <div>
                        <p className="font-ui text-xs uppercase text-brown-earth font-bold mb-sm">
                          Color
                        </p>
                        <p className="font-body text-brown-dark">
                          {flower.color}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="font-ui text-xs uppercase text-brown-earth font-bold mb-sm">
                        Fun Fact
                      </p>
                      <p className="font-body text-brown-dark">
                        {flower.funFact}
                      </p>
                    </div>
                  </div>

                  {/* Full Description */}
                  <div>
                    <p className="font-body text-brown-dark leading-relaxed">
                      {flower.fullDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-lg border-t border-brown-light/20 flex items-center gap-md">
              <motion.button
                className={`flex items-center gap-sm px-lg py-md rounded-lg font-ui font-semibold transition-all ${
                  isFavorite
                    ? "bg-pink-rose text-white"
                    : "bg-pink-light text-pink-rose hover:bg-pink-rose hover:text-white"
                }`}
                onClick={() => onFavoriteClick(flower.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
                {isFavorite ? "Favorited" : "Add to Favorites"}
              </motion.button>

              <button className="flex items-center gap-sm px-lg py-md rounded-lg font-ui font-semibold bg-brown-light/10 text-brown-dark hover:bg-brown-light/20 transition-all">
                <Share2 className="w-5 h-5" />
                Share
              </button>

              <div className="flex-1" />

              {/* Navigation */}
              <div className="flex gap-md">
                <button
                  className="p-md hover:bg-brown-light/10 rounded-lg transition-colors"
                  onClick={() => onNavigate("prev")}
                >
                  <ChevronLeft className="w-5 h-5 text-brown-dark" />
                </button>
                <button
                  className="p-md hover:bg-brown-light/10 rounded-lg transition-colors"
                  onClick={() => onNavigate("next")}
                >
                  <ChevronRight className="w-5 h-5 text-brown-dark" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
```

---

## 7️⃣ SETUP INSTRUCTIONS

### Installation

```bash
# Create React project
npm create vite@latest florin-website -- --template react
cd florin-website

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install animation & UI libraries
npm install framer-motion lucide-react shadcn-ui zustand react-hook-form

# Install utilities
npm install clsx tailwind-merge tailwindcss-animate

# Start development
npm run dev
```

### Tailwind CSS PostCSS Setup

```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Global Styles

```css
/* src/styles/globals.css */
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Merriweather:wght@400;700&family=Poppins:wght@500;600;700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #fffaf0;
}

::-webkit-scrollbar-thumb {
  background: #d4a574;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b4423;
}

/* Selection */
::selection {
  background: #e75480;
  color: white;
}

/* Smooth Scroll */
html {
  scroll-behavior: smooth;
}
```

---

## 🎯 NEXT STEPS

1. Set up the project structure
2. Create reusable components
3. Implement flower data
4. Build main pages
5. Add animations
6. Implement favorites & search
7. Test responsiveness
8. Optimize performance
9. Deploy

---

**Happy coding! Remember, every line of code should express your love! 💕🌹**

