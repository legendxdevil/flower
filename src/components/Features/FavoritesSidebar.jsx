import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../../lib/icons";
import { useFavorites } from "../../hooks/useFavorites";
import { flowers as allFlowers } from "../../lib/flowers";
import { shareContent, getSocialShareLinks, copyToClipboard, generateInstagramCaption, generateShareCard, downloadImage } from "../../lib/shareUtils";
import { SharePreviewModal } from "../UI/SharePreviewModal";

export const FavoritesSidebar = ({ isOpen, onClose }) => {
  const { favorites, removeFavorite } = useFavorites();
  const [showShareFallback, setShowShareFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const favoriteFlowers = allFlowers.filter((f) => favorites.includes(f.id));

  const handleShare = async () => {
    if (favoriteFlowers.length === 0) return;
    setIsGenerating(true);
    try {
      const { generateCollageCard } = await import("../../lib/shareUtils");
      const dataUrl = await generateCollageCard(favoriteFlowers);
      setPreviewImage(dataUrl);
      setIsPreviewOpen(true);
    } catch (err) {
      console.error("Collage generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const socialLinks = getSocialShareLinks({
    text: `Check out my favorite flowers at Florin: ${favoriteFlowers.map(f => f.name).join(', ')}`,
    url: window.location.href
  });

  const handleCopy = async () => {
    const text = `My Favorite Flowers at Florin: ${favoriteFlowers.map(f => f.name).join(', ')}. View all at ${window.location.href}`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInstagramShare = async () => {
    // 1. Copy formatted favorites list for Instagram
    const caption = `🌸 MY FLORIN FAVORITES 🌸\n\n${favoriteFlowers.map(f => `• ${f.name}: "${f.romanticMessage}"`).join('\n\n')}\n\nExplore these stories at ${window.location.host}\n#Florin #MyFavorites #BotanicalArt`;
    await copyToClipboard(caption);
    
    // 2. Alert user
    alert("✨ Favorites list copied to clipboard formatted for Instagram!\n\nSimply paste the list when you create your post.");
    window.open("https://www.instagram.com/", "_blank");
  };

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
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
            className="fixed right-0 top-0 h-full w-full max-w-md bg-accent-cream border-l-2 border-brown-light/30 shadow-deep z-50 flex flex-col"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-lg border-b border-brown-light/20 bg-white/50 backdrop-blur-md">
              <h3 className="font-display text-2xl text-pink-rose font-bold">
                ♥ My Favorites
              </h3>
              <button
                onClick={onClose}
                className="p-sm hover:bg-pink-light rounded-lg transition-colors cursor-pointer"
              >
                <Icons.X className="w-6 h-6 text-brown-dark" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-lg custom-scrollbar">
              {favoriteFlowers.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                  <span className="text-6xl mb-lg animate-pulse">🌹</span>
                  <p className="font-body text-brown-dark text-lg">
                    No favorites yet. <br /> Start adding your favorite flowers!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {favoriteFlowers.map((flower, index) => (
                    <motion.div
                      key={flower.id}
                      className="bg-white rounded-xl p-md flex items-center gap-4 relative border border-brown-light/20 hover:shadow-soft transition-all min-h-24 group"
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-pink-50">
                        <img src={flower.imageUrl} className="w-full h-full object-cover" alt={flower.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-brown-dark truncate text-lg">
                          {flower.name}
                        </p>
                        <p className="font-body text-xs text-brown-dark/70 truncate pt-1">
                          {flower.meaning}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFavorite(flower.id)}
                        className="ml-auto p-2 bg-white rounded-full shadow-sm border border-brown-light/10 text-brown-dark hover:text-pink-rose hover:bg-pink-50 transition-all cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100"
                        title="Remove Favorite"
                      >
                        <Icons.X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {favoriteFlowers.length > 0 && (
              <div className="p-lg border-t border-brown-light/20 space-y-md bg-white/50 backdrop-blur-md">
                <div className="relative">
                  {favoriteFlowers.length > 0 && (
                    <div className="bg-pink-rose/5 border border-pink-rose/20 rounded-xl p-3 mb-4 text-center shadow-sm">
                      <p className="text-[11px] font-bold text-pink-rose uppercase tracking-[0.2em] leading-tight">
                        ✨ 4 images kar must for collage! ✨
                      </p>
                      <p className="text-[9px] text-brown-dark/40 font-ui mt-1 italic">
                        Select your favorite quartet for the perfect mix
                      </p>
                    </div>
                  )}
                  <button 
                    onClick={handleShare}
                    disabled={isGenerating}
                    className={`w-full py-3 px-md text-white font-ui font-semibold rounded-lg hover:shadow-hover transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      isGenerating ? "bg-brown-light cursor-wait" : "bg-gradient-to-r from-pink-rose to-pink-accent"
                    }`}
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Collage...
                      </span>
                    ) : (
                      <>
                        <Icons.Share2 className="w-5 h-5" />
                        Share Favorites Collage
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {showShareFallback && (
                      <motion.div
                        className="absolute bottom-full left-0 right-0 mb-4 bg-white rounded-2xl shadow-deep p-4 border border-brown-light/20 flex justify-around items-center z-30"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      >
                        <button 
                          onClick={handleInstagramShare} 
                          className="p-3 bg-pink-500/10 text-pink-600 rounded-full hover:bg-pink-500/20 transition-colors"
                          title="Share to Instagram"
                        >
                          <Icons.Instagram className="w-6 h-6" />
                        </button>
                        <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-500/10 text-green-600 rounded-full hover:bg-green-500/20 transition-colors">
                          <Icons.WhatsApp className="w-6 h-6" />
                        </a>
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-400/10 text-blue-400 rounded-full hover:bg-blue-400/20 transition-colors">
                          <Icons.Twitter className="w-6 h-6" />
                        </a>
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-700/10 text-blue-700 rounded-full hover:bg-blue-700/20 transition-colors">
                          <Icons.Facebook className="w-6 h-6" />
                        </a>
                        <button onClick={handleCopy} className="p-3 bg-brown-light/10 text-brown-dark rounded-full hover:bg-brown-light/20 transition-colors relative">
                          <Icons.Copy className="w-6 h-6" />
                          {copied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-brown-dark text-white px-2 py-1 rounded">Copied!</span>}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button 
                  onClick={() => {
                    const element = document.createElement("a");
                    const file = new Blob([favoriteFlowers.map(f => `${f.name}: ${f.meaning} - "${f.romanticMessage}"`).join('\n\n')], {type: 'text/plain'});
                    element.href = URL.createObjectURL(file);
                    element.download = "my-favorite-flowers.txt";
                    document.body.appendChild(element);
                    element.click();
                  }}
                  className="w-full py-3 px-md border-2 border-brown-earth text-brown-dark font-ui font-semibold rounded-lg hover:bg-brown-light/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Icons.Download className="w-5 h-5" />
                  Download List
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <SharePreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        image={previewImage}
        title="My Favorites"
        onDownload={() => downloadImage(previewImage, "my-florin-favorites")}
        onCopy={handleCopy}
        socialLinks={socialLinks}
      />
    </>
  );
};
