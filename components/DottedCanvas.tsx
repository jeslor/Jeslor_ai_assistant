"use client";
import React, { useEffect, useRef } from "react";

const DottedCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawDots = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.07)";
      const gap = 30;
      for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2, true);
          ctx.fill();
        }
      }
    };

    drawDots();
    window.addEventListener("resize", drawDots);
    return () => window.removeEventListener("resize", drawDots);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default DottedCanvas;
