import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../../lib/icons";
import { PaperTexture } from "./PaperTexture";

export const SharePreviewModal = ({ isOpen, onClose, image, title, onDownload, socialLinks, onCopy }) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-brown-dark/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-2xl bg-accent-cream rounded-3xl shadow-deep overflow-hidden flex flex-col border-2 border-brown-light/30"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-brown-light/20 flex items-center justify-between bg-white/40">
              <div>
                <h3 className="font-display text-xl text-pink-rose font-bold">Share Preview</h3>
                <p className="font-body text-xs text-brown-dark/60">Review your botanical card before sending</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-pink-rose hover:text-white rounded-full transition-all cursor-pointer"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Image Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center bg-brown-light/5">
              <div className="relative group max-w-sm w-full bg-white p-3 shadow-deep rounded-sm border border-brown-light/10">
                <img 
                  src={image} 
                  alt="Share Preview" 
                  className="w-full h-auto rounded-xs shadow-soft"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
              </div>
              
              <p className="mt-6 font-body text-sm text-brown-dark text-center px-8 italic">
                "Beautifully captured at Florin - Indian Flowers of Romance"
              </p>
            </div>

            {/* Action Footer */}
            <PaperTexture className="p-8 border-t border-brown-light/20 bg-white/60">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={onDownload}
                  className="py-3 px-6 bg-brown-dark text-white rounded-xl font-ui font-semibold flex items-center justify-center gap-3 hover:bg-brown-earth transition-all shadow-md cursor-pointer"
                >
                  <Icons.Download className="w-5 h-5" />
                  Download
                </button>
                <button
                  onClick={onCopy}
                  className="py-3 px-6 bg-white border-2 border-brown-light/30 text-brown-dark rounded-xl font-ui font-semibold flex items-center justify-center gap-3 hover:bg-pink-light transition-all cursor-pointer"
                >
                  <Icons.Copy className="w-5 h-5" />
                  Copy Info
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-ui text-xs font-bold text-brown-earth uppercase tracking-widest whitespace-nowrap">
                  Share To:
                </span>
                <div className="h-px bg-brown-light/20 flex-1" />
                <div className="flex gap-3">
                  {socialLinks?.whatsapp && (
                    <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-500/10 text-green-600 rounded-full hover:bg-green-500/20 transition-colors">
                      <Icons.WhatsApp className="w-6 h-6" />
                    </a>
                  )}
                  {socialLinks?.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-400/10 text-blue-400 rounded-full hover:bg-blue-400/20 transition-colors">
                      <Icons.Twitter className="w-6 h-6" />
                    </a>
                  )}
                  {socialLinks?.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-700/10 text-blue-700 rounded-full hover:bg-blue-700/20 transition-colors">
                      <Icons.Facebook className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            </PaperTexture>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
