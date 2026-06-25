import ClippedMediaGallery from '@/components/UI/clip-path-image';
import React from 'react';

const ClippedMediaGalleryDemo: React.FC = () => {
  const mediaContent = [
    {
      src: 'https://images.unsplash.com/photo-1727889490721-4f27ef9b6673?q=80&w=870&auto=format&fit=crop',
      alt: 'Abstract Squiggle Art',
      clipId: 'clip-squiggle',
      type: 'image' as const,
    },
    {
      src: 'https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4',
      alt: 'Abstract Rectangular Video',
      clipId: 'clip-rect',
      type: 'video' as const,
    },
    {
      src: 'https://images.unsplash.com/photo-1695239510467-f1e93d649c2b?q=80&w=874&auto=format&fit=crop',
      alt: 'Abstract Another Clip',
      clipId: 'clip-another',
      type: 'image' as const,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-zinc-900 min-h-[500px]">
      <div className="w-full max-w-4xl border rounded-lg shadow-md p-6 bg-white dark:bg-black">

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Content Demonstration
          </h3>
          <ClippedMediaGallery />
        </div>

      </div>
    </div>
  );
};

export { ClippedMediaGalleryDemo as DemoOne };
export default ClippedMediaGalleryDemo;
