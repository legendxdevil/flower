import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../../lib/icons";
import { PaperTexture } from "../UI/PaperTexture";
import { SharePreviewModal } from "../UI/SharePreviewModal";
import { shareContent, getSocialShareLinks, copyToClipboard, generateInstagramCaption, generateShareCard, downloadImage } from "../../lib/shareUtils";

// Premium themed colors based on categories
const categoryThemes = {
  roses: {
    bg: "bg-[#8A1C2A]", // Deep crimson/burgundy
    text: "text-[#FDF2F8]",
    accent: "text-amber-200",
    stampBg: "bg-[#FAEAD5]",
    progressColor: "bg-amber-300",
    badgeBorder: "border-amber-200/40",
    iconBg: "bg-white/10",
  },
  anniversaries: {
    bg: "bg-[#2F4F4F]", // Deep forest green / dark slate
    text: "text-[#F0FDF4]",
    accent: "text-emerald-200",
    stampBg: "bg-[#FAEAD5]",
    progressColor: "bg-emerald-300",
    badgeBorder: "border-emerald-200/40",
    iconBg: "bg-white/10",
  },
  birthdays: {
    bg: "bg-[#7C5F3F]", // Warm amber brown / ochre
    text: "text-[#FEF3C7]",
    accent: "text-amber-100",
    stampBg: "bg-[#FFFAF0]",
    progressColor: "bg-amber-400",
    badgeBorder: "border-amber-100/40",
    iconBg: "bg-white/10",
  },
  weddings: {
    bg: "bg-[#6A4B56]", // Deep dusty plum
    text: "text-[#FFF5F5]",
    accent: "text-rose-200",
    stampBg: "bg-[#F5E6E8]",
    progressColor: "bg-rose-300",
    badgeBorder: "border-rose-200/40",
    iconBg: "bg-white/10",
  },
  "new-baby": {
    bg: "bg-[#3B596A]", // Slate blue / twilight
    text: "text-[#F0F9FF]",
    accent: "text-sky-200",
    stampBg: "bg-[#FFFFAF]",
    progressColor: "bg-sky-300",
    badgeBorder: "border-sky-200/40",
    iconBg: "bg-white/10",
  },
  default: {
    bg: "bg-[#5F6C40]", // brand green
    text: "text-[#f9f0eb]",
    accent: "text-lime-200",
    stampBg: "bg-[#FFFAF0]",
    progressColor: "bg-lime-300",
    badgeBorder: "border-lime-200/40",
    iconBg: "bg-white/10",
  },
};

export const FlowerModal = ({ flower: propFlower, isOpen, onClose, isFavorite, onFavoriteToggle }) => {
  const [showShareFallback, setShowShareFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeFlower, setActiveFlower] = useState(null);

  // Sync propFlower to activeFlower state
  React.useEffect(() => {
    if (propFlower) {
      setActiveFlower(propFlower);
    }
  }, [propFlower]);

  const flower = propFlower || activeFlower;

  if (!flower) return null;

  const theme = categoryThemes[flower.category] || categoryThemes.default;

  const handleShare = async () => {
    // Generate the card data URL
    const dataUrl = await generateShareCard(flower);
    setPreviewImage(dataUrl);
    setIsPreviewOpen(true);
  };

  const socialLinks = flower ? getSocialShareLinks({
    text: `Discover the ${flower.name}: "${flower.romanticMessage}"`,
    url: window.location.href
  }) : {};

  const handleCopy = async () => {
    const text = `${flower.name}: "${flower.romanticMessage}". View at Florin: ${window.location.href}`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInstagramShare = async () => {
    // 1. Copy perfect Instagram caption
    const caption = generateInstagramCaption(flower);
    await copyToClipboard(caption);
    
    // 2. Generate and download the share card image
    await generateShareCard(flower);
    
    // 3. Inform user and redirect
    alert("✨ Optimized Instagram card downloaded and caption copied to clipboard!\n\nSimply paste the caption when you post on Instagram.");
    window.open("https://www.instagram.com/", "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && flower && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-brand-rose/25 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-5xl h-[95vh] md:h-[620px] bg-[#FDF9F6] rounded-[2.5rem] shadow-deep overflow-hidden flex flex-col md:flex-row border border-[#EBE1D7]/70"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-30 p-2.5 bg-white/90 hover:bg-brand-rose hover:text-white rounded-full text-brand-rose transition-all shadow-md cursor-pointer backdrop-blur-sm"
            >
              <Icons.X className="w-4 h-4" />
            </button>

            {/* Decorative Leaf SVG Outlines at the Margins */}
            <div className="absolute left-[-20px] top-[-10px] bottom-[-10px] w-[140px] pointer-events-none opacity-20 z-0">
              <svg className="w-full h-full text-brand-green" viewBox="0 0 100 300" fill="none" stroke="currentColor">
                <path d="M -10,300 C 20,200 40,100 10,0" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 12,210 C 35,190 55,200 65,225 C 45,245 25,235 12,210 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="1" />
                <path d="M 23,130 C 50,115 70,130 80,155 C 55,170 35,155 23,130 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="1" />
                <path d="M 18,50 C 40,35 60,50 70,75 C 50,90 30,75 18,50 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="1" />
              </svg>
            </div>

            <div className="absolute right-[-20px] top-[-10px] bottom-[-10px] w-[140px] pointer-events-none opacity-20 z-0">
              <svg className="w-full h-full text-brand-green" viewBox="0 0 100 300" fill="none" stroke="currentColor">
                <path d="M 110,300 C 80,200 60,100 90,0" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 88,210 C 65,190 45,200 35,225 C 55,245 75,235 88,210 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="1" />
                <path d="M 77,130 C 50,115 30,130 20,155 C 45,170 65,155 77,130 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="1" />
                <path d="M 82,50 C 60,35 40,50 30,75 C 50,90 70,75 82,50 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="1" />
              </svg>
            </div>

            {/* Paper grain/texture overlay */}
            <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none z-0" />

            {/* Left Session: High-res Floating Image */}
            <motion.div
              className="w-full md:w-[45%] h-64 md:h-auto relative overflow-hidden flex items-center justify-center p-8 z-10"
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.05 }}
            >
              {/* White Circular Backdrop */}
              <div className="absolute w-[80%] h-[80%] rounded-full bg-white/60 border border-[#EBE1D7]/40 shadow-[inset_0_4px_12px_rgba(0,0,0,0.03)] z-0" />
              
              <motion.img
                src={flower.imageUrl}
                alt={flower.name}
                className="w-[85%] h-[85%] object-contain z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)]"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -1.5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-6 left-6 z-20">
                <div className="bg-white/95 px-5 py-2.5 rounded-full shadow-soft border border-brand-rose/10 flex items-center justify-center">
                  <span className="font-ui text-xs font-bold text-brand-rose uppercase tracking-[0.25em] leading-none">
                    {flower.categoryLabel || "Featured"}
                  </span>
                </div>
              </div>
            </motion.div>
            {/* Right Session: Content inside elegant category backplate */}
            <div className="w-full md:w-[55%] h-[60%] md:h-auto flex flex-col p-4 md:p-6 justify-center z-10 overflow-y-auto md:overflow-visible">
              <div className={`${theme.bg} w-full max-w-[380px] h-[390px] rounded-[2.5rem] p-7 flex flex-col justify-between border-2 border-double ${theme.badgeBorder} relative overflow-hidden shadow-card mx-auto`}>
                {/* Double inner border lines container */}
                <div className="absolute inset-1.5 border border-white/10 rounded-[2.2rem] pointer-events-none" />

                {/* Main section */}
                <div className="flex-1 flex flex-col justify-between relative z-10">
                  
                  {/* Header info */}
                  <div>
                    <h3 className="font-['Alex_Brush'] text-4xl sm:text-[2.75rem] text-white/95 leading-none tracking-wide font-normal mb-1 filter drop-shadow-sm">
                      {flower.designerTitle || flower.name.split(" ")[0]}
                    </h3>
                    <p className="text-[10px] text-white/60 font-ui uppercase tracking-[0.25em] leading-none mb-3">
                      {flower.categoryLabel || "Collection"} Specimen
                    </p>
                    <p className="text-[10.5px] text-white/85 font-body leading-relaxed line-clamp-3">
                      {flower.symbolism}
                    </p>
                  </div>

                  {/* Bloom Indicator progress pill */}
                  <div className="flex items-center gap-2.5 text-white/90">
                    <span className="text-[11px] font-ui font-medium opacity-85">
                      Bloom: {flower.season}
                    </span>
                    <div className="w-16 h-3 bg-white/15 rounded-full overflow-hidden p-[2px] border border-white/10 flex items-center">
                      <div className={`h-full ${theme.progressColor} rounded-full w-[60%]`} />
                    </div>
                  </div>

                  {/* Polaroid / "Dear me" Message */}
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-[2px] p-3 rounded-xl border border-white/5">
                    {/* Miniature Photo with Polaroid Border */}
                    <div className="w-12 h-12 bg-white p-[3px] pb-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.2)] rounded flex-shrink-0 border border-amber-800/10 rotate-[-2deg]">
                      <img
                        src={flower.imageUrl}
                        alt=""
                        className="w-full h-full object-cover rounded-[1px] brightness-[1.02]"
                      />
                    </div>
                    {/* Dear me message */}
                    <div className="flex flex-col min-w-0">
                      <span className={`text-[10px] font-semibold ${theme.accent} leading-none font-display mb-1`}>
                        Dear me,
                      </span>
                      <p className="font-body text-[10px] text-white/90 leading-relaxed italic pr-1 line-clamp-3">
                        "{flower.romanticMessage}"
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Actions below the card */}
              <div className="flex gap-4 w-full max-w-[380px] mx-auto mt-5 pt-3 border-t border-brand-rose/10 relative z-10">
                <motion.button
                  className={`flex-1 py-3 px-5 rounded-xl font-ui font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer text-xs shadow-soft ${
                    isFavorite
                      ? "bg-brand-rose text-white border border-brand-rose"
                      : "bg-white text-brand-rose border border-brand-rose/20 hover:bg-brand-pinkBg/20"
                  }`}
                  onClick={() => onFavoriteToggle(flower.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icons.Heart className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`} />
                  {isFavorite ? "Saved" : "Add Favorite"}
                </motion.button>

                <div className="relative flex-1 flex flex-col">
                  <motion.button
                    className="w-full py-3 px-5 bg-brand-green text-white hover:bg-brand-green/90 rounded-xl font-ui font-semibold flex items-center justify-center gap-2 transition-all shadow-soft cursor-pointer text-xs"
                    onClick={() => setShowShareFallback(!showShareFallback)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icons.Share2 className="w-4 h-4" />
                    Share Story
                  </motion.button>

                  {/* Social Fallback Menu */}
                  <AnimatePresence>
                    {showShareFallback && (
                      <motion.div
                        className="absolute bottom-full left-0 right-0 mb-3 bg-white rounded-2xl shadow-deep p-3 border border-brand-rose/15 flex justify-around items-center z-30"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      >
                        <button
                          onClick={handleInstagramShare}
                          className="p-2 bg-pink-500/10 text-pink-600 rounded-full hover:bg-pink-500/20 transition-colors"
                          title="Generate Instagram Post"
                        >
                          <Icons.Instagram className="w-5 h-5" />
                        </button>
                        <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-500/10 text-green-600 rounded-full hover:bg-green-500/20 transition-colors">
                          <Icons.WhatsApp className="w-5 h-5" />
                        </a>
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-400/10 text-blue-400 rounded-full hover:bg-blue-400/20 transition-colors">
                          <Icons.Twitter className="w-5 h-5" />
                        </a>
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-700/10 text-blue-700 rounded-full hover:bg-blue-700/20 transition-colors">
                          <Icons.Facebook className="w-5 h-5" />
                        </a>
                        <button onClick={handleCopy} className="p-2 bg-brand-pinkBg text-brand-rose rounded-full hover:bg-brand-pinkBg/80 transition-colors relative">
                          <Icons.Copy className="w-5 h-5" />
                          {copied && <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] bg-brand-rose text-white px-2 py-0.5 rounded">Copied!</span>}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Share Preview Modal */}
          <SharePreviewModal
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            image={previewImage}
            title={flower.name}
            onDownload={() => downloadImage(previewImage, flower.name)}
            onCopy={handleCopy}
            socialLinks={socialLinks}
          />
        </div>
      )}
    </AnimatePresence>
  );
};
