"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      if (cursorRef.current) {
        // Direct DOM manipulation for maximum performance
        cursorRef.current.style.setProperty('--cursor-x', `${e.clientX}px`);
        cursorRef.current.style.setProperty('--cursor-y', `${e.clientY}px`);
      }
      
      const target = e.target;
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" || 
        target.closest("a") || 
        target.closest("button");
        
      setIsPointer(!!isClickable);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}} />
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `translate3d(calc(var(--cursor-x, 0px) - 50%), calc(var(--cursor-y, 0px) - 50%), 0) scale(${isPointer ? 1.8 : 1})`,
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

