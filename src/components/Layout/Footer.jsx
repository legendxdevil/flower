import React from "react";
import { motion } from "framer-motion";
import { Icons } from "../../lib/icons";
import { PaperTexture } from "../UI/PaperTexture";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brown-dark text-white overflow-hidden">
      {/* Paper Texture Overlay */}
      <PaperTexture className="absolute inset-0 z-0 opacity-10" />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-lg py-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2xl">
          
          {/* Logo & About */}
          <div className="space-y-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌹</span>
              <span className="font-display text-3xl font-bold text-pink-rose uppercase tracking-tighter">
                FLORIN
              </span>
            </div>
            <p className="font-body text-sm text-brown-light/80 leading-relaxed max-w-xs">
              Florin is an interactive showcase of Indian flowers of romance. 
              Celebrating the hidden beauty and meanings within nature's most perfect creations. 
              A digital tribute to botanical art and love.
            </p>
            <div className="flex gap-4">
              {[Icons.Instagram, Icons.Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="p-3 bg-white/5 rounded-full hover:bg-pink-rose transition-all shadow-md"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-xl text-pink-rose font-bold">Quick Links</h4>
            <ul className="space-y-md">
              {["Gallery", "Stories", "About", "Contact", "Favorites"].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase()}`} 
                    className="font-ui text-sm text-brown-light/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-rose group-hover:w-3 group-hover:bg-pink-accent transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-xl mb-xl text-pink-rose font-bold">Get in Touch</h4>
            <ul className="space-y-lg">
              <li className="flex items-center gap-4 text-sm text-brown-light/60">
                <Icons.Mail className="w-5 h-5 text-pink-rose shrink-0" />
                <span>hello@florin.love</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-brown-light/60">
                <Icons.MapPin className="w-5 h-5 text-pink-rose shrink-0" />
                <span>Valley of Flowers, Uttarakhand, India</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-brown-light/60">
                <Icons.Phone className="w-5 h-5 text-pink-rose shrink-0" />
                <span>+91 987 654 3210</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Romantic Greeting */}
          <div className="p-xl bg-white/5 rounded-2xl border border-white/10 shadow-lg">
            <h4 className="font-display text-xl mb-lg text-pink-rose font-bold">Join the Romance</h4>
            <p className="font-body text-xs text-brown-light/60 mb-xl">
              Subscribe for weekly stories about romantic flowers and their meanings.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email..." 
                className="w-full px-4 py-2 bg-white/10 rounded-lg text-sm text-white placeholder-white/30 border border-white/10 outline-none focus:border-pink-rose transition-colors"
              />
              <button className="px-4 py-2 bg-pink-rose text-white rounded-lg font-ui text-sm font-semibold hover:bg-pink-accent transition-all cursor-pointer">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4xl pt-xl border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-lg text-xs font-ui text-brown-light/40 tracking-widest uppercase">
          <p>© {currentYear} FLORIN • ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-2">
            MADE WITH <Icons.Heart className="w-3 h-3 text-pink-rose fill-pink-rose animate-pulse" /> FOR A ROMANTIC SOUL
          </div>
          <div className="flex gap-xl">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
