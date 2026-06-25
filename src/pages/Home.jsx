import React, { useRef, useState, useMemo } from "react";
import { Navbar } from "../components/Layout/Navbar";
import { HeroSection } from "../components/Sections/HeroSection";
import { CategoriesSection } from "../components/Sections/CategoriesSection";
import { FlowerGrid } from "../components/Sections/FlowerGrid";
import { FavoritesSidebar } from "../components/Features/FavoritesSidebar";
import { Footer } from "../components/Layout/Footer";
import { FlowerModal } from "../components/Flowers/FlowerModal";
import { ScrollToTop } from "../components/UI/ScrollToTop";
import { flowers } from "../lib/flowers";
import { useFavorites } from "../hooks/useFavorites";
import { ButterflyOverlay } from "../components/UI/ButterflyOverlay";
import { motion } from "framer-motion";
import ClippedMediaGallery from "../components/ui/clip-path-image";



const categoryMetadata = {
  "new-baby": {
    title: "New Baby Collection",
    subtitle: "Welcoming Little Miracles",
    description: "Celebrate the arrival of a new life with our softest, most delicate pastel arrangements. Crafted with gentle colors like baby pink, powder blue, peach, and ivory, these blooms represent hope, purity, and bright new beginnings.",
    media: [
      {
        src: "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800&auto=format&fit=crop",
        alt: "Soft pastel roses and daisies",
        clipId: "clip-squiggle",
        type: "image",
      },
      {
        src: "https://videos.pexels.com/video-files/4612093/4612093-sd_640_360_25fps.mp4",
        alt: "Swaying delicate white flowers in wind",
        clipId: "clip-rect",
        type: "video",
      },
      {
        src: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop",
        alt: "Charming peach bouquet",
        clipId: "clip-another",
        type: "image",
      }
    ]
  },
  "anniversaries": {
    title: "Anniversary Blooms",
    subtitle: "Celebrating Milestones of Love",
    description: "Milestones deserve to be remembered in full bloom. Our anniversary collection showcases passionate crimson roses, opulent orchids, and elegant, custom-designed bouquets that capture the depth, devotion, and ongoing journey of your love.",
    media: [
      {
        src: "https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=800&auto=format&fit=crop",
        alt: "Crimson anniversary roses",
        clipId: "clip-squiggle",
        type: "image",
      },
      {
        src: "https://videos.pexels.com/video-files/4612093/4612093-sd_640_360_25fps.mp4",
        alt: "Slow motion blooming flower petals",
        clipId: "clip-rect",
        type: "video",
      },
      {
        src: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop",
        alt: "Stunning purple and white orchids",
        clipId: "clip-another",
        type: "image",
      }
    ]
  },
  "birthdays": {
    title: "Birthday Curations",
    subtitle: "Vibrant Celebrations of Life",
    description: "Brighten their special day with flowers that match their energy. Bursting with sun-soaked golden sunflowers, bright pink gerberas, and lush, colorful wild blooms, this collection brings immediate joy, laughter, and warm birthday wishes.",
    media: [
      {
        src: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=800&auto=format&fit=crop",
        alt: "Bright sunflowers bouquet",
        clipId: "clip-squiggle",
        type: "image",
      },
      {
        src: "https://videos.pexels.com/video-files/4612093/4612093-sd_640_360_25fps.mp4",
        alt: "Vibrant yellow garden flowers",
        clipId: "clip-rect",
        type: "video",
      },
      {
        src: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop",
        alt: "Bright mixed birthday bouquet",
        clipId: "clip-another",
        type: "image",
      }
    ]
  },
  "roses": {
    title: "Rose Perfection",
    subtitle: "The Timeless Symbol of Devotion",
    description: "Nothing speaks more elegantly than a classic rose. From deep crimson velvet roses expressing intense passion, to soft blush pink and pristine white stems reflecting admiration and grace, find the perfect voice for your feelings here.",
    media: [
      {
        src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
        alt: "Velvety red rose up close",
        clipId: "clip-squiggle",
        type: "image",
      },
      {
        src: "https://videos.pexels.com/video-files/4612093/4612093-sd_640_360_25fps.mp4",
        alt: "Soft red rose swaying in breeze",
        clipId: "clip-rect",
        type: "video",
      },
      {
        src: "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=800&auto=format&fit=crop",
        alt: "Delicate pink roses bouquet",
        clipId: "clip-another",
        type: "image",
      }
    ]
  },
  "weddings": {
    title: "Wedding & Ceremony",
    subtitle: "Enchanted Union of Souls",
    description: "Step into your happily ever after surrounded by premium floral designs. Our wedding collection curates luxurious white lilies, romantic bridal path arches, marigold garlands, and cream rose bouquets that weave magic into your most sacred day.",
    media: [
      {
        src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
        alt: "Luxury wedding centerpiece setup",
        clipId: "clip-squiggle",
        type: "image",
      },
      {
        src: "https://videos.pexels.com/video-files/4612093/4612093-sd_640_360_25fps.mp4",
        alt: "Bridal path floral decoration close-up",
        clipId: "clip-rect",
        type: "video",
      },
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
        alt: "Enchanted wedding flower arch",
        clipId: "clip-another",
        type: "image",
      }
    ]
  }
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  
  const galleryRef = useRef(null);
  const { favorites, toggleFavorite } = useFavorites();

  const handleExplore = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter flowers list based on selected category
  const filteredFlowers = useMemo(() => {
    if (!activeCategory) return flowers;
    return flowers.filter((flower) => flower.category === activeCategory);
  }, [activeCategory]);

  return (
    <div id="root-snap-container" className="h-screen w-screen overflow-y-auto snap-y snap-mandatory scroll-smooth font-body antialiased bg-brand-cream/30 relative no-scrollbar">
      {/* Side Background Watercolor Bleeds */}
      {/* Left side bleed near categories/bestsellers */}
      <div className="absolute top-[700px] left-0 w-[320px] h-[640px] pointer-events-none select-none z-0 opacity-70 blur-[40px] -translate-x-20">
        <svg viewBox="0 0 300 600" className="w-full h-full fill-brand-pinkBg">
          <path d="M0,150 C140,80 240,160 260,300 C280,440 180,520 80,570 C10,600 0,530 0,400 Z" />
        </svg>
      </div>

      {/* Right side bleed in bestsellers grid */}
      <div className="absolute top-[1300px] right-0 w-[320px] h-[640px] pointer-events-none select-none z-0 opacity-70 blur-[40px] translate-x-20">
        <svg viewBox="0 0 300 600" className="w-full h-full fill-brand-pinkBg">
          <path d="M300,150 C160,80 60,160 40,300 C20,440 120,520 220,570 C290,600 300,530 300,400 Z" />
        </svg>
      </div>

      {/* Bottom Left bleed above footer */}
      <div className="absolute bottom-[300px] left-0 w-[380px] h-[550px] pointer-events-none select-none z-0 opacity-60 blur-[45px] -translate-x-24">
        <svg viewBox="0 0 350 500" className="w-full h-full fill-brand-pinkBg">
          <path d="M0,120 C160,60 260,170 230,300 C200,430 110,470 0,420 Z" />
        </svg>
      </div>

      <Navbar onFavoritesClick={() => setSidebarOpen(true)} />
      
      <main className="h-full w-full relative z-10 flex flex-col">
        {/* Slide 1: Hero Section */}
        <div className="w-full h-screen snap-start snap-always flex-shrink-0 relative">
          <HeroSection onExplore={handleExplore} />
        </div>
        
        {/* Slide 2: Store / Catalog Section */}
        <div className="w-full min-h-screen snap-start snap-always flex-shrink-0 relative flex flex-col pt-12 md:pt-16 pb-24">
          
          {/* Dynamic Category Filtering Row */}
          <CategoriesSection
            activeCategory={activeCategory}
            onSelectCategory={(category) => {
              setActiveCategory(category);
              // Scroll down to best sellers to show filtered results
              setTimeout(() => {
                const el = document.getElementById("best-sellers-section");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }, 100);
            }}
          />

          {/* Scrollable Flower Grid + Footer */}
          <div className="w-full px-6 md:px-12 lg:px-20 pb-20 relative z-20">
            {/* Dynamic Category Showcase Banner */}
            {activeCategory && categoryMetadata[activeCategory] && (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto px-6 py-12 border-b border-brand-rose/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Left Text Detail */}
                <div className="lg:col-span-5 flex flex-col justify-center text-left">
                  <span className="font-ui text-xs font-bold tracking-[0.3em] text-brand-rose/70 uppercase mb-2 block">
                    {categoryMetadata[activeCategory].subtitle}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-brand-rose font-medium tracking-[0.05em] uppercase mb-4 leading-tight">
                    {categoryMetadata[activeCategory].title}
                  </h2>
                  <div className="w-12 h-[2px] bg-brand-rose/40 mb-4" />
                  <p className="font-body text-[13px] sm:text-sm text-brand-green/90 leading-relaxed font-light mb-6">
                    {categoryMetadata[activeCategory].description}
                  </p>
                  
                  {/* Mustasurma customized signature quote */}
                  <div className="font-mustasurma text-xl text-brand-rose/55 italic mb-6">
                    "Made on Earth, designed with you in mind."
                  </div>

                  <button
                    onClick={() => setActiveCategory(null)}
                    className="self-start text-[11px] font-ui font-semibold text-brand-rose hover:text-brand-rose/80 uppercase tracking-widest flex items-center gap-1.5 transition-colors group cursor-pointer"
                  >
                    <span>Clear Filter</span>
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Right Integrated ClippedMediaGallery Banner */}
                <div className="lg:col-span-7">
                  <ClippedMediaGallery 
                    mediaItems={categoryMetadata[activeCategory].media} 
                    className="border-brand-rose/15 shadow-soft max-w-md mx-auto"
                  />
                </div>
              </motion.div>
            )}

            <FlowerGrid 
              ref={galleryRef}
              flowers={filteredFlowers} 
              favorites={favorites} 
              onFavoriteClick={toggleFavorite}
              onFlowerClick={(flower) => setSelectedFlower(flower)}
              activeCategory={activeCategory}
            />
            <Footer />
          </div>

        </div>
      </main>

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

      {/* Dreamy Butterfly Animations Overlay */}
      <ButterflyOverlay />
    </div>
  );
}
