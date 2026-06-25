import React from "react";
import { motion } from "framer-motion";
import { Icons } from "../../lib/icons";
import { PaperTexture } from "../UI/PaperTexture";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="relative bg-white text-gray-800 border-t border-brand-rose/10 overflow-hidden">
      {/* Paper Texture Overlay */}
      <PaperTexture className="absolute inset-0 z-0 opacity-[0.02]" />

      {/* Main Footer Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl">
          
          {/* Logo & About */}
          <div className="space-y-md">
            <div className="flex items-center gap-2">
              <span className="text-2xl text-brand-rose">🌹</span>
              <span className="font-display text-2xl font-semibold text-brand-green tracking-[0.2em] uppercase">
                FLORIN
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-brand-rose/70 leading-relaxed max-w-xs">
              Florin is an interactive showcase of Indian flowers of romance. 
              Celebrating the hidden beauty and meanings within nature's most perfect creations. 
              A digital tribute to botanical art and love.
            </p>
            <div className="flex gap-3">
              {[Icons.Instagram, Icons.Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="p-2.5 bg-brand-pink-bg/40 rounded-full hover:bg-brand-rose hover:text-white text-brand-rose transition-all shadow-sm"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-[15px] tracking-wider uppercase mb-lg text-brand-rose font-semibold">Quick Links</h4>
            <ul className="space-y-sm">
              {["Gallery", "Stories", "About", "Contact", "Favorites"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#`} 
                    className="font-ui text-xs sm:text-sm text-brand-rose/70 hover:text-brand-rose transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-rose/30 group-hover:bg-brand-rose transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-[15px] tracking-wider uppercase mb-lg text-brand-rose font-semibold">Get in Touch</h4>
            <ul className="space-y-sm">
              <li className="flex items-center gap-3 text-xs sm:text-sm text-brand-rose/70">
                <Icons.Mail className="w-4 h-4 text-brand-rose shrink-0" />
                <span>hello@florin.love</span>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm text-brand-rose/70">
                <Icons.MapPin className="w-4 h-4 text-brand-rose shrink-0" />
                <span>Valley of Flowers, Uttarakhand, India</span>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm text-brand-rose/70">
                <Icons.Phone className="w-4 h-4 text-brand-rose shrink-0" />
                <span>+91 987 654 3210</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Romantic Greeting */}
          <div className="p-lg bg-brand-cream border border-brand-rose/15 rounded-2xl shadow-soft">
            <h4 className="font-display text-[15px] tracking-wider uppercase mb-md text-brand-rose font-semibold">Join the Romance</h4>
            <p className="font-body text-[11px] sm:text-xs text-brand-rose/70 mb-lg">
              Subscribe for weekly stories about romantic flowers and their meanings.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email..." 
                className="w-full px-3 py-1.5 bg-white rounded-lg text-xs text-gray-800 placeholder-brand-rose/35 border border-brand-rose/20 outline-none focus:border-brand-rose transition-colors"
              />
              <button className="px-3.5 py-1.5 bg-brand-rose text-white rounded-lg font-ui text-xs font-semibold hover:bg-brand-rose/90 transition-all cursor-pointer">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-xl pt-lg border-t border-brand-rose/10 flex flex-col md:flex-row justify-between items-center gap-md text-[10px] font-ui text-brand-rose/50 tracking-widest uppercase">
          <p>© {currentYear} FLORIN • ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-1.5">
            MADE WITH <Icons.Heart className="w-3 h-3 text-brand-rose fill-brand-rose animate-pulse" /> FOR A ROMANTIC SOUL
          </div>
          <div className="flex gap-lg">
            <a href="#" className="hover:text-brand-rose transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-rose transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
