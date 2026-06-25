import React, { useRef, useState } from "react";
import { Navbar } from "../components/Layout/Navbar";
import { HeroSection } from "../components/Sections/HeroSection";
import { StorySection } from "../components/Sections/StorySection";
import { FlowerGrid } from "../components/Sections/FlowerGrid";
import { FavoritesSidebar } from "../components/Features/FavoritesSidebar";
import { FlowerModal } from "../components/Flowers/FlowerModal";
import { flowers } from "../lib/flowers";
import { useFavorites } from "../hooks/useFavorites";
import { ButterflyOverlay } from "../components/UI/ButterflyOverlay";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState(null);
  
  const containerRef = useRef(null);
  const galleryRef = useRef(null);
  const { favorites, toggleFavorite } = useFavorites();

  // Scroll progress reads from the snap container itself
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Parallax transforms for background blobs
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const yBlob3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleExplore = () => {
    // Scroll the snap container to the gallery section
    const el = galleryRef.current;
    const container = containerRef.current;
    if (el && container) {
      container.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      id="root-snap-container"
      className="h-screen w-screen overflow-y-auto snap-y snap-mandatory scroll-smooth font-body antialiased bg-brand-cream/30 relative no-scrollbar"
    >
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-rose origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Decorative Watercolor Bleed — Left */}
      <motion.div
        style={{ y: yBlob1 }}
        className="absolute top-[700px] left-0 w-[320px] h-[640px] pointer-events-none select-none z-0 opacity-70 blur-[40px] -translate-x-20"
      >
        <svg viewBox="0 0 300 600" className="w-full h-full fill-brand-pinkBg">
          <path d="M0,150 C140,80 240,160 260,300 C280,440 180,520 80,570 C10,600 0,530 0,400 Z" />
        </svg>
      </motion.div>

      {/* Decorative Watercolor Bleed — Right */}
      <motion.div
        style={{ y: yBlob2 }}
        className="absolute top-[1300px] right-0 w-[320px] h-[640px] pointer-events-none select-none z-0 opacity-70 blur-[40px] translate-x-20"
      >
        <svg viewBox="0 0 300 600" className="w-full h-full fill-brand-pinkBg">
          <path d="M300,150 C160,80 60,160 40,300 C20,440 120,520 220,570 C290,600 300,530 300,400 Z" />
        </svg>
      </motion.div>

      {/* Decorative Watercolor Bleed — Bottom Left */}
      <motion.div
        style={{ y: yBlob3 }}
        className="absolute bottom-[300px] left-0 w-[380px] h-[550px] pointer-events-none select-none z-0 opacity-60 blur-[45px] -translate-x-24"
      >
        <svg viewBox="0 0 350 500" className="w-full h-full fill-brand-pinkBg">
          <path d="M0,120 C160,60 260,170 230,300 C200,430 110,470 0,420 Z" />
        </svg>
      </motion.div>

      <Navbar onFavoritesClick={() => setSidebarOpen(true)} />

      <main className="w-full relative z-10">

        {/* Snap Slide 1: Hero */}
        <div id="hero-section" className="w-full h-screen snap-start snap-always relative">
          <HeroSection onExplore={handleExplore} scrollYProgress={scrollYProgress} />
        </div>

        {/* Snap Slide 2: Story */}
        <div id="story-section" className="w-full snap-start snap-always relative">
          <StorySection />
        </div>

        {/* Snap Slide 3: Collection */}
        <div ref={galleryRef} id="best-sellers-section" className="w-full snap-start snap-always relative">
          <FlowerGrid
            flowers={flowers}
            favorites={favorites}
            onFavoriteClick={toggleFavorite}
            onFlowerClick={(flower) => setSelectedFlower(flower)}
          />
        </div>

      </main>

      {/* Favorites Sidebar */}
      <FavoritesSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Flower Detail Modal */}
      <FlowerModal
        isOpen={!!selectedFlower}
        flower={selectedFlower}
        onClose={() => setSelectedFlower(null)}
        isFavorite={selectedFlower && favorites.includes(selectedFlower.id)}
        onFavoriteToggle={toggleFavorite}
      />

      {/* Butterfly Overlay */}
      <ButterflyOverlay />
    </div>
  );
}
