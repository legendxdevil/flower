import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFavorites } from "../../hooks/useFavorites";

/* ─── Inline SVG Icons ─── */
const HomeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const UserIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const CompassIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

/* ─── SVG Glass distortion filter (matches reference exactly) ─── */
const GlassFilter = () => (
  <svg style={{ display: "none", position: "absolute" }} aria-hidden="true">
    <defs>
      <filter id="nav-glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lightingColor="white" result="specLight">
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
        <feDisplacementMap in="SourceGraphic" in2="softMap" scale="200" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

/* ─── Glass pill wrapper ─── */
const GlassPill = ({ children }) => (
  <div
    className="relative flex rounded-full"
    style={{
      boxShadow: "0 6px 24px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.35)",
      transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    }}
  >
    {/* Layer 1 — backdrop blur + distortion */}
    <div
      className="absolute inset-0 rounded-full overflow-hidden"
      style={{
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        filter: "url(#nav-glass-distortion)",
        isolation: "isolate",
      }}
    />
    {/* Layer 2 — translucent white fill */}
    <div
      className="absolute inset-0 rounded-full"
      style={{ background: "rgba(255,255,255,0.22)" }}
    />
    {/* Layer 3 — inner highlight rim */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        boxShadow:
          "inset 2px 2px 1px rgba(255,255,255,0.55), inset -1px -1px 1px rgba(255,255,255,0.4)",
      }}
    />
    {/* Content */}
    <div className="relative z-10">{children}</div>
  </div>
);

/* ─── Nav items ─── */
const NAV_ITEMS = [
  { id: "home",    label: "Home",    icon: <HomeIcon />,    targetId: null },
  { id: "about",   label: "About",   icon: <UserIcon />,    targetId: "story-section" },
  { id: "explore", label: "Explore", icon: <CompassIcon />, targetId: "best-sellers-section" },
];

export const Navbar = ({ onFavoritesClick }) => {
  const [active, setActive] = useState("home");
  const favorites = useFavorites((state) => state.favorites);
  const favoriteCount = favorites.length;

  React.useEffect(() => {
    const container = document.getElementById("root-snap-container");
    if (!container) return;

    const observerOptions = {
      root: container,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "hero-section") {
            setActive("home");
          } else if (entry.target.id === "story-section") {
            setActive("about");
          } else if (entry.target.id === "best-sellers-section") {
            setActive("explore");
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const hero = document.getElementById("hero-section");
    const story = document.getElementById("story-section");
    const explore = document.getElementById("best-sellers-section");

    if (hero) observer.observe(hero);
    if (story) observer.observe(story);
    if (explore) observer.observe(explore);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollTo = (item) => {
    setActive(item.id);
    const container = document.getElementById("root-snap-container");

    if (!item.targetId) {
      // Home — scroll to very top
      if (container) container.scrollTo({ top: 0, behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(item.targetId);
    if (!el) return;

    if (container) {
      container.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <GlassFilter />

      <motion.div
        className="fixed top-5 left-1/2 z-50"
        style={{ x: "-50%" }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.2 }}
      >
        <GlassPill>
          <div className="flex items-center gap-1.5 px-2 py-2">

            {/* Nav items */}
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-ui font-semibold text-[12px] tracking-[0.08em] uppercase transition-all duration-500 cursor-pointer"
                  style={{
                    background: isActive ? "#c14756" : "rgba(255,255,255,0.08)",
                    color: isActive ? "#ffffff" : "rgba(95,108,64,0.85)",
                    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}

            {/* Divider */}
            <div className="w-px h-6 mx-1 bg-brand-rose/20 shrink-0" />

            {/* Favorites heart button */}
            <button
              onClick={onFavoritesClick}
              className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: favoriteCount > 0 ? "rgba(193,71,86,0.12)" : "rgba(255,255,255,0.08)",
                color: "#c14756",
              }}
              title="Favorites"
            >
              <HeartIcon filled={favoriteCount > 0} />
              {favoriteCount > 0 && (
                <motion.span
                  className="absolute top-0.5 right-0.5 bg-brand-rose text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] px-1 flex items-center justify-center leading-none pointer-events-none"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {favoriteCount}
                </motion.span>
              )}
            </button>

          </div>
        </GlassPill>
      </motion.div>
    </>
  );
};
