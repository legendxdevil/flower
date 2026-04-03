import React from "react";

export const PaperTexture = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* SVG Texture Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="paperNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale="1"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          filter="url(#paperNoise)"
          fill="currentColor"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
