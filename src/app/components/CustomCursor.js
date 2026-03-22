"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" || 
        target.closest("a") || 
        target.closest("button");
        
      setIsPointer(!!isClickable);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetContent={{ __html: `
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}} />
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isPointer ? 1.8 : 1})`,
          width: '20px',
          height: '20px',
          backgroundColor: 'white',
          borderRadius: '50%',
          opacity: isPointer ? 0.6 : 1
        }}
      />
    </>
  );
}
