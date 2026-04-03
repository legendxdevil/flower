import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../../lib/icons";
import { PaperTexture } from "../UI/PaperTexture";
import { SharePreviewModal } from "../UI/SharePreviewModal";
import { shareContent, getSocialShareLinks, copyToClipboard, generateInstagramCaption, generateShareCard, downloadImage } from "../../lib/shareUtils";

export const FlowerModal = ({ flower, isOpen, onClose, isFavorite, onFavoriteToggle }) => {
  const [showShareFallback, setShowShareFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!flower) return null;

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
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-brown-dark/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] bg-accent-cream rounded-3xl shadow-deep overflow-hidden flex flex-col md:flex-row border-2 border-brown-light/30"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-pink-rose hover:text-white transition-all shadow-md cursor-pointer"
            >
              <Icons.X className="w-6 h-6" />
            </button>

            {/* Left Session: High-res Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-pink-light">
              <motion.img
                src={flower.imageUrl}
                alt={flower.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft">
                  <span className="font-ui text-xs font-bold text-pink-rose uppercase tracking-widest">
                    Featured Flower
                  </span>
                </div>
              </div>
            </div>

            {/* Right Session: Content */}
            <PaperTexture className="w-full md:w-1/2 flex flex-col overflow-y-auto custom-scrollbar">
              <div className="p-8 lg:p-12 flex-1">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="font-display text-4xl lg:text-5xl text-pink-rose font-bold mb-4 tracking-tight">
                    {flower.name}
                  </h2>
                  <div className="w-20 h-1 bg-brown-light/40 mb-8 rounded-full" />
                </motion.div>

                {/* Romantic Message */}
                <motion.div
                  className="mb-10 p-6 bg-white/40 border-l-4 border-pink-rose rounded-r-xl italic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="font-body text-xl text-brown-dark leading-relaxed">
                    "{flower.romanticMessage}"
                  </p>
                </motion.div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                  <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <div className="w-10 h-10 rounded-lg bg-pink-light flex items-center justify-center flex-shrink-0">
                      <Icons.Sparkles className="w-5 h-5 text-pink-rose" />
                    </div>
                    <div>
                      <h4 className="font-ui text-xs font-bold text-brown-earth uppercase mb-1">Meaning</h4>
                      <p className="font-body text-sm text-brown-dark">{flower.meaning}</p>
                    </div>
                  </motion.div>

                  <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <div className="w-10 h-10 rounded-lg bg-brown-light/20 flex items-center justify-center flex-shrink-0">
                      <Icons.Calendar className="w-5 h-5 text-brown-dark" />
                    </div>
                    <div>
                      <h4 className="font-ui text-xs font-bold text-brown-earth uppercase mb-1">Best Season</h4>
                      <p className="font-body text-sm text-brown-dark">{flower.season}</p>
                    </div>
                  </motion.div>

                  <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icons.BookOpen className="w-5 h-5 text-accent-gold" />
                    </div>
                    <div>
                      <h4 className="font-ui text-xs font-bold text-brown-earth uppercase mb-1">Symbolism</h4>
                      <p className="font-body text-sm text-brown-dark">{flower.symbolism}</p>
                    </div>
                  </motion.div>

                  <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                    <div className="w-10 h-10 rounded-lg bg-pink-rose/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">💡</span>
                    </div>
                    <div>
                      <h4 className="font-ui text-xs font-bold text-brown-earth uppercase mb-1">Fun Fact</h4>
                      <p className="font-body text-sm text-brown-dark">{flower.funFact}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-brown-light/20">
                  <motion.button
                    className={`flex-1 py-4 px-6 rounded-xl font-ui font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md ${
                      isFavorite 
                      ? "bg-pink-rose text-white shadow-glow" 
                      : "bg-white text-brown-dark hover:bg-pink-light"
                    }`}
                    onClick={() => onFavoriteToggle(flower.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icons.Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
                    {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
                  </motion.button>
                  
                  <div className="relative flex-1 flex flex-col sm:flex-row gap-4">
                    <motion.button
                      className="flex-1 py-4 px-6 bg-brown-dark text-white rounded-xl font-ui font-semibold flex items-center justify-center gap-3 hover:bg-brown-earth transition-all shadow-md cursor-pointer"
                      onClick={handleShare}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icons.Share2 className="w-5 h-5" />
                      Share Story
                    </motion.button>

                    {/* Social Fallback Menu */}
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
                            title="Generate Instagram Post"
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
                </div>
              </div>
            </PaperTexture>
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
