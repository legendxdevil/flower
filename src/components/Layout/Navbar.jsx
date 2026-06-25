import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../../lib/icons";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { GlassButton } from "../UI/apple-tahoe-liquid-glass-button";

const FlowerLogoIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4">
    <circle cx="50" cy="50" r="10" fill="currentColor" />
    <path d="M50,18 C42,26 38,36 50,36 C62,36 58,26 50,18 Z" fill="none" />
    <path d="M50,82 C42,74 38,64 50,64 C62,64 58,74 50,82 Z" fill="none" />
    <path d="M18,50 C26,42 36,38 36,50 C36,62 26,58 18,50 Z" fill="none" />
    <path d="M82,50 C74,42 64,38 64,50 C64,62 74,58 82,50 Z" fill="none" />
    <path d="M27,27 C35,35 42,30 42,42 C30,42 35,35 27,27 Z" fill="none" />
    <path d="M73,73 C65,65 58,70 58,58 C70,58 65,65 73,73 Z" fill="none" />
    <path d="M27,73 C35,65 42,70 42,58 C30,58 35,65 27,73 Z" fill="none" />
    <path d="M73,27 C65,35 58,30 58,42 C70,42 65,35 73,27 Z" fill="none" />
  </svg>
);

const SettingsIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const BasketIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "products", label: "Shop" },
  { id: "contact", label: "Contact" },
];

export const Navbar = ({ onFavoritesClick }) => {
  const [showSettingsAlert, setShowSettingsAlert] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const favorites = useFavorites((state) => state.favorites);
  const favoriteCount = favorites.length;

  const scrollToSection = (id) => {
    setActiveItem(id);
    const container = document.getElementById("root-snap-container");
    if (id === "home") {
      if (container) {
        container.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (id === "products") {
      const el = document.getElementById("best-sellers-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (id === "about" || id === "contact") {
      const el = document.getElementById("footer-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };


  // CSS variables for the glass effect to work with the color theme
  useEffect(() => {
    document.documentElement.style.setProperty("--foreground", "21 23 14");
    document.documentElement.style.setProperty("--background", "249 240 235");
  }, []);

  return (
    <>
      {/* ─── Floating Bottom Glass Dock ─── */}
      <style>{`
        .glass-dock {
          background: rgba(255, 243, 240, 0.18);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(193, 71, 86, 0.18);
          box-shadow:
            0 8px 32px rgba(193, 71, 86, 0.12),
            0 2px 8px rgba(0,0,0,0.08),
            inset 0 1px 0 rgba(255,255,255,0.6),
            inset 0 -1px 0 rgba(193, 71, 86, 0.08);
        }
        .glass-dock-divider {
          width: 1px;
          height: 28px;
          background: linear-gradient(to bottom, transparent, rgba(193, 71, 86, 0.2), transparent);
          flex-shrink: 0;
        }
        .nav-btn-active .btn-liquid-lens {
          background-color: rgba(193, 71, 86, 0.15) !important;
        }
        :root {
          --foreground: 21 23 14;
          --background: 249 240 235;
        }
      `}</style>

      <motion.div
        className="fixed bottom-6 left-1/2 z-50"
        style={{ x: "-50%" }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 28, delay: 0.3 }}
      >
        <div className="glass-dock rounded-full px-3 py-2 flex items-center gap-1">

          {/* ── Logo mark ── */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full group transition-all duration-300 hover:bg-brand-rose/10 active:scale-95"
          >
            <FlowerLogoIcon
              className="w-5 h-5 text-brand-rose group-hover:rotate-45 transition-transform duration-500"
            />
            <span className="hidden sm:inline font-display text-sm tracking-[0.25em] font-semibold text-brand-green uppercase select-none">
              Florin
            </span>
          </button>

          <div className="glass-dock-divider" />

          {/* ── Nav Items ── */}
          {navItems.map((item) => (
            <GlassButton
              key={item.id}
              size="sm"
              onClick={() => scrollToSection(item.id)}
              className={`font-ui text-[11px] tracking-[0.12em] uppercase font-semibold transition-all ${
                activeItem === item.id
                  ? "text-brand-rose nav-btn-active"
                  : "text-brand-rose/70 hover:text-brand-rose"
              }`}
              glassColor={
                activeItem === item.id
                  ? "rgba(193, 71, 86, 0.12)"
                  : "rgba(255, 255, 255, 0.05)"
              }
            >
              {item.label}
            </GlassButton>
          ))}

          <div className="glass-dock-divider" />

          {/* ── Action Icons ── */}
          <GlassButton
            size="icon"
            onClick={() => {
              setShowSettingsAlert(true);
              setTimeout(() => setShowSettingsAlert(false), 3000);
            }}
            className="text-brand-rose/70 hover:text-brand-rose w-9 h-9"
            glassColor="rgba(255, 255, 255, 0.05)"
            title="Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </GlassButton>

          <GlassButton
            size="icon"
            onClick={onFavoritesClick}
            className="text-brand-rose/70 hover:text-brand-rose w-9 h-9 relative"
            glassColor="rgba(255, 255, 255, 0.05)"
            title="Favorites"
          >
            <BasketIcon className="w-4 h-4" />
            {favoriteCount > 0 && (
              <motion.span
                className="absolute -top-1.5 -right-1.5 bg-brand-rose text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center pointer-events-none z-20 shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {favoriteCount}
              </motion.span>
            )}
          </GlassButton>

        </div>
      </motion.div>

      {/* ─── Settings Toast ─── */}
      <AnimatePresence>
        {showSettingsAlert && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 0.95, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] bg-white/90 backdrop-blur-md shadow-card border border-brand-rose/20 px-5 py-2.5 rounded-full text-brand-rose font-ui text-sm font-semibold"
          >
            ⚙️ Settings customization coming soon!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
