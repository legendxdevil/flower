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
            className="absolute inset-0 bg-brand-rose/25 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-deep overflow-hidden flex flex-col md:flex-row border border-brand-rose/10"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 bg-white/80 backdrop-blur-sm rounded-full text-brand-rose hover:bg-brand-rose hover:text-white transition-all shadow-md cursor-pointer"
            >
              <Icons.X className="w-5 h-5" />
            </button>

            {/* Left Session: High-res Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-brand-pinkBg/30 flex items-center justify-center p-8">
              <div className="absolute w-[80%] h-[80%] rounded-full bg-white/50 z-0" />
              <motion.img
                src={flower.imageUrl}
                alt={flower.name}
                className="w-[85%] h-[85%] object-contain z-10"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-rose/10 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft border border-brand-rose/10">
                  <span className="font-ui text-xs font-bold text-brand-rose uppercase tracking-widest">
                    {flower.categoryLabel || "Featured Flower"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Session: Content */}
            <PaperTexture className="w-full md:w-1/2 flex flex-col overflow-y-auto custom-scrollbar bg-brand-cream/10">
              <div className="p-8 lg:p-12 flex-1">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="font-display text-3.5xl lg:text-4.5xl text-brand-rose font-medium mb-3 tracking-wide">
                    {flower.name}
                  </h2>
                  <div className="w-20 h-[2px] bg-brand-rose/25 mb-8 rounded-full" />
                </motion.div>

                {/* Romantic Message */}
                <motion.div
                  className="mb-10 p-6 bg-brand-pink-bg/20 border-l-4 border-brand-rose rounded-r-2xl italic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="font-body text-lg text-brand-rose leading-relaxed">
                    "{flower.romanticMessage}"
                  </p>
                </motion.div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                  <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <div className="w-10 h-10 rounded-xl bg-brand-pinkBg/50 flex items-center justify-center flex-shrink-0 text-brand-rose">
                      <Icons.Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-ui text-xs font-bold text-brand-green uppercase mb-1 tracking-wider">Meaning</h4>
                      <p className="font-body text-sm text-gray-700">{flower.meaning}</p>
                    </div>
                  </motion.div>

                  <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <div className="w-10 h-10 rounded-xl bg-brand-pinkBg/50 flex items-center justify-center flex-shrink-0 text-brand-rose">
                      <Icons.Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-ui text-xs font-bold text-brand-green uppercase mb-1 tracking-wider">Best Season</h4>
                      <p className="font-body text-sm text-gray-700">{flower.season}</p>
                    </div>
                  </motion.div>

                  <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <div className="w-10 h-10 rounded-xl bg-brand-pinkBg/50 flex items-center justify-center flex-shrink-0 text-brand-rose">
                      <Icons.BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-ui text-xs font-bold text-brand-green uppercase mb-1 tracking-wider">Symbolism</h4>
                      <p className="font-body text-sm text-gray-700">{flower.symbolism}</p>
                    </div>
                  </motion.div>

                  <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                    <div className="w-10 h-10 rounded-xl bg-brand-pinkBg/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">💡</span>
                    </div>
                    <div>
                      <h4 className="font-ui text-xs font-bold text-brand-green uppercase mb-1 tracking-wider">Fun Fact</h4>
                      <p className="font-body text-sm text-gray-700">{flower.funFact}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-brand-rose/10">
                  <motion.button
                    className={`flex-1 py-4 px-6 rounded-xl font-ui font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-soft ${
                      isFavorite 
                      ? "bg-brand-rose text-white" 
                      : "bg-white text-brand-rose border border-brand-rose/20 hover:bg-brand-pink-bg/30"
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
                      className="flex-1 py-4 px-6 bg-brand-green text-white rounded-xl font-ui font-semibold flex items-center justify-center gap-3 hover:bg-brand-green/90 transition-all shadow-soft cursor-pointer"
                      onClick={() => setShowShareFallback(!showShareFallback)}
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
                          className="absolute bottom-full left-0 right-0 mb-4 bg-white rounded-2xl shadow-deep p-4 border border-brand-rose/15 flex justify-around items-center z-30"
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
                          <button onClick={handleCopy} className="p-3 bg-brand-pinkBg text-brand-rose rounded-full hover:bg-brand-pinkBg/80 transition-colors relative">
                            <Icons.Copy className="w-6 h-6" />
                            {copied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-brand-rose text-white px-2 py-1 rounded">Copied!</span>}
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
