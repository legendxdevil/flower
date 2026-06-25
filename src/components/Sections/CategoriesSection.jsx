import React from "react";
import { motion } from "framer-motion";

// Icons and categories mapping ... [unchanged code]

const BabyIcon = () => (
  <svg className="w-13 h-13 sm:w-15 sm:h-15 text-brand-rose transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="3.5" />
    <path d="M8.5 9a3.5 3.5 0 0 1 7 0" />
    <path d="M12 12.5c-3 0-5 2.5-5 5.5A3 3 0 0 0 10 21h4a3 3 0 0 0 3-3c0-3-2-5.5-5-5.5Z" />
    <path d="M7.5 15.5 12 18.5l4.5-3" />
    <path d="M12 4.5c.2-.5.8-.8 1.3-.5.4.3.4.9.1 1.2L12 6.5l-1.4-1.3c-.3-.3-.3-.9.1-1.2.5-.3 1.1 0 1.3.5Z" fill="currentColor" className="opacity-25" />
  </svg>
);

const BouquetIcon = () => (
  <svg className="w-13 h-13 sm:w-15 sm:h-15 text-brand-rose transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 7 9 7-9" />
    <path d="M12 21 8.5 12h7L12 21Z" fill="currentColor" className="opacity-10" />
    <path d="M10 18.5c-1-.5-2 .5-2 1.5s1 2 2 1.5M14 18.5c1-.5 2 .5 2 1.5s-1 2-2 1.5" />
    <circle cx="12" cy="18.5" r="1" fill="currentColor" />
    <circle cx="12" cy="8" r="2.5" />
    <circle cx="12" cy="8" r="1.25" fill="currentColor" />
    <circle cx="8" cy="11" r="2" />
    <circle cx="8" cy="11" r="1" fill="currentColor" />
    <circle cx="16" cy="11" r="2" />
    <circle cx="16" cy="11" r="1" fill="currentColor" />
    <circle cx="9" cy="5.5" r="2" />
    <circle cx="15" cy="5.5" r="2" />
    <path d="M12 5.5V3M7.5 8.5c-1-1-1-2.5 0-3.5" />
    <path d="M16.5 8.5c1-1 1-2.5 0-3.5" />
  </svg>
);

const BalloonsIcon = () => (
  <svg className="w-13 h-13 sm:w-15 sm:h-15 text-brand-rose transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 9.5a4 4.5 0 1 1 8 0c0 2.5-1.8 4.5-4 4.5s-4-2-4-4.5Z" />
    <path d="M10.5 14v.5l-.5.5h1l-.5-.5V14Z" fill="currentColor" />
    <path d="M11.5 7.5a4 4.5 0 1 1 8 0c0 2.5-1.8 4.5-4 4.5s-4-2-4-4.5Z" />
    <path d="M15.5 12v.5l-.5.5h1l-.5-.5V12Z" fill="currentColor" />
    <path d="M10.5 15c-1 2-1.5 3-1.5 5" />
    <path d="M15.5 13c0 2-.5 4.5-1.5 7" />
  </svg>
);

const RoseIcon = () => (
  <svg className="w-13 h-13 sm:w-15 sm:h-15 text-brand-rose transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12Z" />
    <path d="M12 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
    <path d="M12 6.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" fill="currentColor" />
    <path d="M10 7.5c0 .5-.5 1-1 1M14 7.5c0 .5.5 1 1 1" />
    <path d="M12 12v9" />
    <path d="M12 15c2 0 3.5-.5 4-2-.5 1-2 1.5-4 1.5ZM12 18c-2 0-3.5-.5-4-2 .5 1 2 1.5 4 1.5Z" fill="currentColor" className="opacity-10" />
    <path d="M12 16.5l-1.5-.5M12 19l1.5-.5" />
  </svg>
);

const WeddingRingsIcon = () => (
  <svg className="w-13 h-13 sm:w-15 sm:h-15 text-brand-rose transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9.5" cy="13.5" r="4.5" />
    <circle cx="9.5" cy="13.5" r="3.5" fill="currentColor" className="opacity-10" />
    <circle cx="14.5" cy="13.5" r="4.5" />
    <circle cx="14.5" cy="13.5" r="3.5" fill="currentColor" className="opacity-10" />
    <path d="M12 6.8c-.5-1-.9-1.8-2-1.8a2.2 2.2 0 0 0-2.2 2.2c0 2 2.7 4 4.2 4.8 1.5-.8 4.2-2.8 4.2-4.8A2.2 2.2 0 0 0 14 5c-1.1 0-1.5.8-2 1.8Z" fill="currentColor" className="opacity-25" />
  </svg>
);

const categories = [
  { id: "new-baby", name: "New Baby", label: "New Baby", Icon: BabyIcon },
  { id: "anniversaries", name: "Anniversaries", label: "Anniversaries", Icon: BouquetIcon },
  { id: "birthdays", name: "Birthdays", label: "Birthdays", Icon: BalloonsIcon },
  { id: "roses", name: "Roses", label: "Roses", Icon: RoseIcon },
  { id: "weddings", name: "Weddings", label: "Weddings", Icon: WeddingRingsIcon },
];

export const CategoriesSection = ({ activeCategory, onSelectCategory }) => {
  return (
    <section className="py-20 bg-brand-cream/40 relative z-20">
      <div className="w-full px-6 md:px-12 lg:px-20 text-center mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl sm:text-h2 text-brand-rose font-medium tracking-[0.05em] uppercase mb-4"
        >
          FLOWER CATEGORIES
        </motion.h2>

        {/* Section Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body text-xs sm:text-sm text-brand-rose/65 max-w-3xl mx-auto px-lg mb-16 leading-relaxed"
        >
          Explore our Flower Categories to find the perfect blooms for any occasion.
          From vibrant roses to delicate lilies, our selection offers something for every taste and celebration.
        </motion.p>

        {/* Categories Row */}
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16">
          {categories.map((category, index) => {
            const isSelected = activeCategory === category.id;
            const Icon = category.Icon;

            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => {
                  // Toggle active category
                  onSelectCategory(isSelected ? null : category.id);
                }}
                className="flex flex-col items-center group cursor-pointer"

              >
                {/* Circle Icon Container */}
                <motion.div
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border flex items-center justify-center transition-all duration-300 relative ${
                    isSelected
                      ? "border-brand-rose bg-brand-pink-bg text-brand-rose shadow-hover"
                      : "border-brand-rose/40 hover:border-brand-rose hover:bg-brand-pink-bg/10 text-brand-rose/80"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon />
                  
                  {/* Small tooltip / active indicator dot */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 w-2.5 h-2.5 bg-brand-rose rounded-full"
                    />
                  )}
                </motion.div>

                {/* Category Label */}
                <span className="mt-5 font-ui text-[13px] sm:text-sm tracking-wider text-brand-rose/85 font-medium group-hover:text-brand-rose transition-colors duration-300">
                  {category.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
