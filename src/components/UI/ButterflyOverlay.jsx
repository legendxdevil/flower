import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const STYLES = `
@keyframes flap-left {
  0% { transform: rotateY(75deg); }
  50% { transform: rotateY(0deg); }
  100% { transform: rotateY(-20deg); }
}
@keyframes flap-right {
  0% { transform: rotateY(-75deg); }
  50% { transform: rotateY(0deg); }
  100% { transform: rotateY(20deg); }
}
.butterfly-3d-space {
  perspective: 1000px;
  transform-style: preserve-3d;
}
.wing-left-flap {
  transform-origin: right center;
  animation: flap-left 0.6s ease-in-out infinite alternate;
}
.wing-right-flap {
  transform-origin: left center;
  animation: flap-right 0.6s ease-in-out infinite alternate;
}
`;

const generateNewPath = (fromX, fromY) => {
  const padding = 100;
  const toX = padding + Math.random() * (window.innerWidth - padding * 2);
  const toY = padding + Math.random() * (window.innerHeight - padding * 2);
  
  const dx = toX - fromX;
  const dy = toY - fromY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Slower flight speed: 35-60px per second for a lazier, dreamier feel
  const speed = 35 + Math.random() * 25;
  const duration = Math.max(9, distance / speed);
  
  // Angle of flight direction (+90 degrees because sprite faces up)
  const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
  
  // Perpendicular vector for fluttery s-curve movement
  const perpX = -dy / (distance || 1);
  const perpY = dx / (distance || 1);
  
  const segments = 4;
  const xKeyframes = [];
  const yKeyframes = [];
  const rotateKeyframes = [];
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const baseX = fromX + dx * t;
    const baseY = fromY + dy * t;
    
    if (i === 0) {
      xKeyframes.push(fromX);
      yKeyframes.push(fromY);
      rotateKeyframes.push(angle);
    } else if (i === segments) {
      xKeyframes.push(toX);
      yKeyframes.push(toY);
      rotateKeyframes.push(angle);
    } else {
      // Gentle wavy curves
      const amplitude = Math.sin(t * Math.PI * 2) * (35 + Math.random() * 15);
      xKeyframes.push(baseX + perpX * amplitude);
      yKeyframes.push(baseY + perpY * amplitude);
      rotateKeyframes.push(angle + (Math.random() - 0.5) * 12);
    }
  }
  
  return {
    toX,
    toY,
    xKeyframes,
    yKeyframes,
    rotateKeyframes,
    duration,
    angle
  };
};

const LeftWingSVG = ({ gradId, wingColors }) => (
  <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
    <defs>
      <radialGradient id={gradId} cx="85%" cy="50%" r="85%">
        <stop offset="0%" stopColor={wingColors.cyan} />
        <stop offset="35%" stopColor={wingColors.blue} />
        <stop offset="70%" stopColor={wingColors.deepBlue} />
        <stop offset="100%" stopColor="#020508" />
      </radialGradient>
      <filter id="glow-left">
        <feGaussianBlur stdDeviation="1.5" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Base Gradient Wing */}
    <path 
      d="M 100 55 C 85 10, 45 0, 15 15 C 0 25, 5 55, 95 65 C 70 72, 40 82, 30 92 C 15 105, 35 120, 65 115 C 85 110, 95 85, 100 65 Z" 
      fill={`url(#${gradId})`}
      filter="url(#glow-left)"
      opacity="0.92"
    />
    
    {/* Outer Black Border - Adjusted strokeWidth to look delicate at smaller sizes */}
    <path 
      d="M 100 55 C 85 10, 45 0, 15 15 C 0 25, 5 55, 95 65 C 70 72, 40 82, 30 92 C 15 105, 35 120, 65 115 C 85 110, 95 85, 100 65 Z" 
      fill="none" 
      stroke="#040810" 
      strokeWidth="4.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />

    {/* Veins */}
    <path 
      d="M 100 60 L 30 20 
         M 100 60 L 15 38 
         M 100 60 L 12 55 
         M 100 60 L 32 68 
         M 100 60 L 30 88 
         M 100 60 L 50 108" 
      stroke="#040810" 
      strokeWidth="0.8" 
      strokeLinecap="round"
      opacity="0.8"
      fill="none" 
    />
    
    {/* White Spots dashed curve along margins */}
    <path 
      d="M 28 18 C 12 32, 12 55, 95 65 C 65 72, 40 85, 32 95 C 25 106, 45 115, 65 112" 
      fill="none" 
      stroke="#ffffff" 
      strokeWidth="1.5" 
      strokeDasharray="1 5.5" 
      strokeLinecap="round"
      opacity="0.95"
    />

    {/* Edge dots */}
    <circle cx="16" cy="24" r="1.2" fill="#ffffff" />
    <circle cx="9" cy="38" r="1.2" fill="#ffffff" />
    <circle cx="10" cy="52" r="1.2" fill="#ffffff" />
    <circle cx="24" cy="100" r="1.0" fill="#ffffff" />
    <circle cx="40" cy="111" r="1.0" fill="#ffffff" />
    
    {/* Wing tip highlights */}
    <path d="M 24 19 C 20 21, 21 26, 28 23 Z" fill="#ffffff" opacity="0.9" />
    <path d="M 34 16 C 31 17, 32 21, 37 19 Z" fill="#ffffff" opacity="0.9" />
  </svg>
);

const RightWingSVG = ({ gradId, wingColors }) => (
  <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
    <defs>
      <radialGradient id={gradId} cx="15%" cy="50%" r="85%">
        <stop offset="0%" stopColor={wingColors.cyan} />
        <stop offset="35%" stopColor={wingColors.blue} />
        <stop offset="70%" stopColor={wingColors.deepBlue} />
        <stop offset="100%" stopColor="#020508" />
      </radialGradient>
      <filter id="glow-right">
        <feGaussianBlur stdDeviation="1.5" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Base Gradient Wing */}
    <path 
      d="M 0 55 C 15 10, 55 0, 85 15 C 100 25, 95 55, 5 65 C 30 72, 60 82, 70 92 C 85 105, 65 120, 35 115 C 15 110, 5 85, 0 65 Z" 
      fill={`url(#${gradId})`}
      filter="url(#glow-right)"
      opacity="0.92"
    />
    
    {/* Outer Black Border */}
    <path 
      d="M 0 55 C 15 10, 55 0, 85 15 C 100 25, 95 55, 5 65 C 30 72, 60 82, 70 92 C 85 105, 65 120, 35 115 C 15 110, 5 85, 0 65 Z" 
      fill="none" 
      stroke="#040810" 
      strokeWidth="4.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />

    {/* Veins */}
    <path 
      d="M 0 60 L 70 20 
         M 0 60 L 85 38 
         M 0 60 L 88 55 
         M 0 60 L 68 68 
         M 0 60 L 70 88 
         M 0 60 L 50 108" 
      stroke="#040810" 
      strokeWidth="0.8" 
      strokeLinecap="round"
      opacity="0.8"
      fill="none" 
    />
    
    {/* White Spots dashed curve along margins */}
    <path 
      d="M 72 18 C 88 32, 88 55, 5 65 C 35 72, 60 85, 68 95 C 75 106, 55 115, 35 112" 
      fill="none" 
      stroke="#ffffff" 
      strokeWidth="1.5" 
      strokeDasharray="1 5.5" 
      strokeLinecap="round"
      opacity="0.95"
    />

    {/* Edge dots */}
    <circle cx="84" cy="24" r="1.2" fill="#ffffff" />
    <circle cx="91" cy="38" r="1.2" fill="#ffffff" />
    <circle cx="90" cy="52" r="1.2" fill="#ffffff" />
    <circle cx="76" cy="100" r="1.0" fill="#ffffff" />
    <circle cx="60" cy="111" r="1.0" fill="#ffffff" />
    
    {/* Wing tip highlights */}
    <path d="M 76 19 C 80 21, 79 26, 72 23 Z" fill="#ffffff" opacity="0.9" />
    <path d="M 66 16 C 69 17, 68 21, 63 19 Z" fill="#ffffff" opacity="0.9" />
  </svg>
);

const BodyAndAntennaeSVG = () => (
  <svg viewBox="0 0 20 50" className="w-full h-full overflow-visible">
    {/* Antennae */}
    <path 
      d="M 9 10 Q 5 2, 2 3 
         M 11 10 Q 15 2, 18 3" 
      fill="none" 
      stroke="#040810" 
      strokeWidth="0.9" 
      strokeLinecap="round" 
    />
    {/* Head */}
    <circle cx="10" cy="11" r="1.8" fill="#040810" />
    {/* Thorax */}
    <ellipse cx="10" cy="18" rx="2.0" ry="4.0" fill="#040810" />
    {/* Abdomen */}
    <ellipse cx="10" cy="31" rx="1.4" ry="8" fill="#040810" />
  </svg>
);

const SingleButterfly = ({ colorTheme, onPositionUpdate }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [path, setPath] = useState(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Start from random edge
    const border = Math.floor(Math.random() * 4);
    let startX = 0;
    let startY = 0;
    
    if (border === 0) { // Top
      startX = Math.random() * window.innerWidth;
      startY = -70;
    } else if (border === 1) { // Right
      startX = window.innerWidth + 70;
      startY = Math.random() * window.innerHeight;
    } else if (border === 2) { // Bottom
      startX = Math.random() * window.innerWidth;
      startY = window.innerHeight + 70;
    } else { // Left
      startX = -70;
      startY = Math.random() * window.innerHeight;
    }

    setPosition({ x: startX, y: startY });
    setPath(generateNewPath(startX, startY));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        if (x > 0 && x < window.innerWidth && y > 0 && y < window.innerHeight) {
          onPositionUpdate({
            id: Math.random(),
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            color: colorTheme.sparkColor,
            timestamp: Date.now()
          });
        }
      }
    }, 120);

    return () => clearInterval(interval);
  }, [colorTheme, onPositionUpdate]);

  if (!path) return null;

  const handleAnimationComplete = () => {
    setPath(generateNewPath(path.toX, path.toY));
  };

  const { shadow, flapSpeed, wingColors, gradId } = colorTheme;

  return (
    <motion.div
      ref={containerRef}
      className="fixed z-50 pointer-events-none butterfly-3d-space w-16 h-16"
      style={{ originX: "32px", originY: "32px" }}
      initial={{ x: position.x, y: position.y, rotate: path.angle }}
      animate={{
        x: path.xKeyframes,
        y: path.yKeyframes,
        rotate: path.rotateKeyframes,
      }}
      transition={{
        duration: path.duration,
        ease: "easeInOut",
      }}
      onAnimationComplete={handleAnimationComplete}
    >
      <div 
        className="relative w-[64px] h-[64px] select-none"
        style={{
          filter: `drop-shadow(0 0 10px ${shadow})`
        }}
      >
        {/* Left Wing - Connects exactly to center coordinate x=32 */}
        <div 
          className="wing-left-flap absolute top-[14.5px] right-[32px] w-[29px] h-[35px] transform-style-3d"
          style={{ animationDuration: `${flapSpeed}s` }}
        >
          <LeftWingSVG gradId={`${gradId}-left`} wingColors={wingColors} />
        </div>

        {/* Right Wing - Connects exactly to center coordinate x=32 */}
        <div 
          className="wing-right-flap absolute top-[14.5px] left-[32px] w-[29px] h-[35px] transform-style-3d"
          style={{ animationDuration: `${flapSpeed}s` }}
        >
          <RightWingSVG gradId={`${gradId}-right`} wingColors={wingColors} />
        </div>

        {/* Body and Antennae - Center aligned at x=32 */}
        <div 
          className="absolute top-[13.5px] left-[25px] w-[14px] h-[35px] z-10"
        >
          <BodyAndAntennaeSVG />
        </div>
      </div>
    </motion.div>
  );
};

export const ButterflyOverlay = () => {
  const [sparks, setSparks] = useState([]);

  const handlePositionUpdate = useCallback((newSpark) => {
    setSparks((prev) => [...prev, newSpark]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setSparks((prev) => prev.filter((spark) => now - spark.timestamp < 1200));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const themes = [
    {
      id: 1,
      gradId: "cyan-blue-butterfly",
      flapSpeed: 0.65,
      wingColors: {
        cyan: "#00e5ff",
        blue: "#00b0ff",
        deepBlue: "#1565c0"
      },
      shadow: "rgba(0, 229, 255, 0.8)",
      sparkColor: "#00e5ff"
    },
    {
      id: 2,
      gradId: "electric-indigo-butterfly",
      flapSpeed: 0.75,
      wingColors: {
        cyan: "#80deea",
        blue: "#3d5afe",
        deepBlue: "#311b92"
      },
      shadow: "rgba(124, 77, 255, 0.75)",
      sparkColor: "#82b1ff"
    },
    {
      id: 3,
      gradId: "teal-cyan-butterfly",
      flapSpeed: 0.58,
      wingColors: {
        cyan: "#64ffda",
        blue: "#00b0ff",
        deepBlue: "#006064"
      },
      shadow: "rgba(100, 255, 218, 0.8)",
      sparkColor: "#64ffda"
    }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* Sparks Layer */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="fixed rounded-full pointer-events-none z-[49]"
          style={{
            left: spark.x,
            top: spark.y,
            width: `${2.0 + Math.random() * 4.0}px`,
            height: `${2.0 + Math.random() * 4.0}px`,
            backgroundColor: spark.color,
            boxShadow: `0 0 8px ${spark.color}, 0 0 3px ${spark.color}`,
          }}
          initial={{ opacity: 0.95, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0.15, 
            y: spark.y + 40 + Math.random() * 20,
            x: spark.x + (Math.random() - 0.5) * 18 
          }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      ))}

      {/* Butterflies Layer */}
      {themes.map((theme) => (
        <SingleButterfly
          key={theme.id}
          colorTheme={theme}
          onPositionUpdate={handlePositionUpdate}
        />
      ))}
    </>
  );
};
