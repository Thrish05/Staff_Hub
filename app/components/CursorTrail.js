"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorTrail() {
  const [positions, setPositions] = useState([]);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setIsMoving(true);
      setPositions((prev) => [...prev, { x: e.clientX, y: e.clientY }].slice(-15)); // Keep last 15 positions
    };

    const handleMouseStop = () => {
      setIsMoving(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseStop);
    const stopTimeout = setTimeout(handleMouseStop, 100); // Detect stopping

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseStop);
      clearTimeout(stopTimeout);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full">
      {isMoving &&
        positions.map((pos, index) => (
          <motion.div
            key={index}
            className="absolute w-3 h-3 bg-blue-500 rounded-full"
            style={{ filter: `blur(${5 - index * 0.3}px)` }} // Smooth blur effect
            animate={{ x: pos.x - 6, y: pos.y - 6, opacity: 1 - index * 0.07 }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        ))}
    </div>
  );
}
