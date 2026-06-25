import React from "react";
import { motion } from "framer-motion";
import ClippedMediaGallery from "../UI/clip-path-image";

const storyChapters = [
  {
    id: "seed-of-passion",
    title: "The Seed of Passion",
    subtitle: "Where Dreams Take Root",
    description: "Florin started in a small garden corner with a simple vision: to bring people closer through the silent, beautiful language of flowers. Each seed we planted was a commitment to artistry, purity, and slow, intentional growth.",
    quote: "Rooted in love, grown with absolute devotion.",
    media: [
      {
        src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop",
        alt: "A cozy greenhouse of green plants and seedlings",
        clipId: "clip-squiggle",
        type: "image",
      },
      {
        src: "https://videos.pexels.com/video-files/4612093/4612093-sd_640_360_25fps.mp4",
        alt: "Swaying delicate white flowers in wind",
        clipId: "clip-rect",
        type: "video",
      },
      {
        src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop",
        alt: "Close up of delicate flower seedlings in soil",
        clipId: "clip-another",
        type: "image",
      }
    ]
  },
  {
    id: "sourced-devotion",
    title: "Sourced with Devotion",
    subtitle: "Crafting Nature's Poetry",
    description: "Every petal we choose is hand-picked at peak bloom, ensuring the highest longevity and vibrant hues. Our design philosophy merges classical romance with modern organic structures, letting each arrangement tell its own unique story.",
    quote: "Designed on Earth, curated with your moments in mind.",
    media: [
      {
        src: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop",
        alt: "Elegant purple and white orchids",
        clipId: "clip-squiggle",
        type: "image",
      },
      {
        src: "https://videos.pexels.com/video-files/4612093/4612093-sd_640_360_25fps.mp4",
        alt: "Swaying delicate white flowers in wind",
        clipId: "clip-rect",
        type: "video",
      },
      {
        src: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop",
        alt: "Lush colorful wild blooms bouquet",
        clipId: "clip-another",
        type: "image",
      }
    ]
  },
  {
    id: "legacy-of-petals",
    title: "A Legacy of Petals",
    subtitle: "Bringing Hearts Closer",
    description: "Flowers have the unique power to speak when words fail. From cozy birthday table centerpieces to grand bridal archways, our mission is to weave natural magic into your life's most precious celebrations.",
    quote: "Where flowers speak the words that hearts feel.",
    media: [
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
        alt: "Enchanted wedding flower archway",
        clipId: "clip-squiggle",
        type: "image",
      },
      {
        src: "https://videos.pexels.com/video-files/4612093/4612093-sd_640_360_25fps.mp4",
        alt: "Swaying delicate white flowers in wind",
        clipId: "clip-rect",
        type: "video",
      },
      {
        src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
        alt: "Velvety red rose up close",
        clipId: "clip-another",
        type: "image",
      }
    ]
  }
];

export const StorySection = () => {
  return (
    <section id="story-section-inner" className="py-20 bg-brand-cream/40 relative z-20">
      <div className="w-full px-6 md:px-12 lg:px-20 text-center mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl sm:text-h2 text-brand-rose font-medium tracking-[0.05em] uppercase mb-4"
        >
          OUR STORY
        </motion.h2>

        {/* Section Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body text-xs sm:text-sm text-brand-rose/65 max-w-3xl mx-auto px-lg mb-16 leading-relaxed"
        >
          A journey of passion, art, and the silent language of blooms. Discover how we cultivate
          moments of grace, connection, and timeless romance in every single arrangement we create.
        </motion.p>

        {/* Story Chapters Stack */}
        <div className="flex flex-col gap-24 mt-16 max-w-5xl mx-auto">
          {storyChapters.map((chapter, index) => {
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ type: "spring", stiffness: 45, damping: 15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center text-left"
              >
                {/* Text Block */}
                <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? "lg:order-last" : ""}`}>
                  <span className="font-ui text-xs font-bold tracking-[0.3em] text-brand-rose/70 uppercase mb-2 block">
                    {chapter.subtitle}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-brand-rose font-medium tracking-[0.05em] uppercase mb-4 leading-tight">
                    {chapter.title}
                  </h3>
                  <div className="w-12 h-[2px] bg-brand-rose/40 mb-4" />
                  <p className="font-body text-[13px] sm:text-sm text-brand-green/90 leading-relaxed font-light mb-6">
                    {chapter.description}
                  </p>
                  
                  {/* Poetic Quote signature */}
                  <div className="font-mustasurma text-xl text-brand-rose/55 italic">
                    "{chapter.quote}"
                  </div>
                </div>

                {/* Media Block (ClippedMediaGallery) */}
                <div className="lg:col-span-7">
                  <ClippedMediaGallery 
                    mediaItems={chapter.media} 
                    className="border-brand-rose/15 shadow-soft max-w-md mx-auto"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
