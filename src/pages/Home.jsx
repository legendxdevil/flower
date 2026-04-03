import React, { useRef, useState, useMemo } from "react";
import { Navbar } from "../components/Layout/Navbar";
import { HeroSection } from "../components/Sections/HeroSection";
import { FlowerGrid } from "../components/Sections/FlowerGrid";
import { FavoritesSidebar } from "../components/Features/FavoritesSidebar";
import { Footer } from "../components/Layout/Footer";
import { FlowerModal } from "../components/Flowers/FlowerModal";
import { FeaturedCarousel } from "../components/Sections/FeaturedCarousel";
import { ScrollToTop } from "../components/UI/ScrollToTop";
import { flowers } from "../lib/flowers";
import { useFavorites } from "../hooks/useFavorites";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState(null);
  
  const galleryRef = useRef(null);
  const { favorites, toggleFavorite } = useFavorites();

  const handleExplore = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filtering removed. Using raw flowers list.

  return (
    <div className="min-h-screen flex flex-col font-body antialiased bg-accent-cream/30">
      <Navbar onFavoritesClick={() => setSidebarOpen(true)} />
      
      <main className="flex-1">
        <HeroSection onExplore={handleExplore} />
        
        <FeaturedCarousel 
          flowers={flowers}
          favorites={favorites}
          onFavoriteClick={toggleFavorite}
          onFlowerClick={(flower) => setSelectedFlower(flower)}
        />

        <div className="max-w-7xl mx-auto px-lg mt-12 relative z-20 pb-20">
          <FlowerGrid 
            ref={galleryRef}
            flowers={flowers} 
            favorites={favorites} 
            onFavoriteClick={toggleFavorite}
            onFlowerClick={(flower) => setSelectedFlower(flower)}
          />
        </div>
      </main>

      <Footer />
      <ScrollToTop />

      <FavoritesSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <FlowerModal 
        isOpen={!!selectedFlower}
        flower={selectedFlower}
        onClose={() => setSelectedFlower(null)}
        isFavorite={selectedFlower && favorites.includes(selectedFlower.id)}
        onFavoriteToggle={toggleFavorite}
      />
    </div>
  );
}
