import React, { useEffect, useState, useRef } from "react";

/* ─── SVG: Pink Arrow Cursor (default state) ─── */
const ArrowCursorSVG = () => (
  <svg
    width="40" height="44"
    viewBox="0 0 40 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shadow / depth layer */}
    <path
      d="M5 3L5 36L13.5 27.5L18 38L22 36.5L17.5 26L28 26L5 3Z"
      fill="#c4457a"
      transform="translate(1.5, 1.5)"
    />
    {/* Main pink arrow body */}
    <path
      d="M5 3L5 36L13.5 27.5L18 38L22 36.5L17.5 26L28 26L5 3Z"
      fill="#f06292"
    />
    {/* Highlight edge (left) */}
    <path
      d="M5 3L5 30L10 25L5 3Z"
      fill="#f48fb1"
    />
    {/* White exclamation mark */}
    <rect x="13.5" y="10" width="3.5" height="12" rx="1.75" fill="white" opacity="0.9"/>
    <circle cx="15.25" cy="26.5" r="2" fill="white" opacity="0.9"/>
  </svg>
);

/* ─── SVG: Pink Flower with Stem (hover state) ─── */
const FlowerCursorSVG = () => (
  <svg
    width="44" height="56"
    viewBox="0 0 44 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Green stem */}
    <path
      d="M22 56 C22 56 20 42 21 32"
      stroke="#4caf50"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Left leaf */}
    <path
      d="M21 40 C16 38 11 34 12 28 C16 32 19 36 21 40Z"
      fill="#66bb6a"
    />
    {/* Right leaf */}
    <path
      d="M21 38 C26 35 32 31 31 25 C27 30 24 34 21 38Z"
      fill="#4caf50"
    />
    {/* Leaf highlight (left) */}
    <path
      d="M14 30 C15 32 17 35 20 39"
      stroke="#a5d6a7"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.7"
    />

    {/* Petals — 8 petals around center */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const cx = 22 + Math.cos(rad) * 9.5;
      const cy = 18 + Math.sin(rad) * 9.5;
      return (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="7"
          ry="5"
          fill="#f06292"
          transform={`rotate(${angle}, ${cx}, ${cy})`}
          opacity={i % 2 === 0 ? "1" : "0.85"}
        />
      );
    })}

    {/* Petal sheen layer (slightly lighter overlay) */}
    {[0, 90, 180, 270].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const cx = 22 + Math.cos(rad) * 9;
      const cy = 18 + Math.sin(rad) * 9;
      return (
        <ellipse
          key={`shine-${i}`}
          cx={cx}
          cy={cy - 1}
          rx="4"
          ry="2.5"
          fill="#f8bbd0"
          transform={`rotate(${angle}, ${cx}, ${cy})`}
          opacity="0.5"
        />
      );
    })}

    {/* Flower center — yellow */}
    <circle cx="22" cy="18" r="8" fill="#fdd835" />
    {/* Center highlight */}
    <circle cx="19.5" cy="15.5" r="3" fill="#fff176" opacity="0.6" />
    {/* Center dark seeds */}
    <circle cx="22" cy="18" r="4.5" fill="#f9a825" opacity="0.4" />
  </svg>
);

export const FlowerCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef(null);
  const rawPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hide the real cursor globally
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const onMove = (e) => {
      rawPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onMouseOver = (e) => {
      const el = e.target.closest(
        "a, button, [role='button'], input, textarea, select, label, [tabindex], [onclick]"
      );
      setIsHover(!!el);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Smooth RAF loop
    const tick = () => {
      setPos((prev) => {
        const dx = rawPos.current.x - prev.x;
        const dy = rawPos.current.y - prev.y;
        // Snap quickly — minimal lag for cursor
        return {
          x: prev.x + dx * 0.85,
          y: prev.y + dy * 0.85,
        };
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <div
      className="pointer-events-none fixed z-[99999] top-0 left-0"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
        willChange: "transform",
      }}
    >
      <div
        style={{
          transform: `translate(-2px, -2px) scale(${isClicking ? 0.88 : 1})`,
          transition: "transform 0.12s ease",
          /* Offset so tip of arrow / base of flower aligns with actual cursor hot spot */
          marginLeft: isHover ? "-14px" : "0px",
          marginTop: isHover ? "-44px" : "0px",
        }}
      >
        {isHover ? <FlowerCursorSVG /> : <ArrowCursorSVG />}
      </div>
    </div>
  );
};
