"use client";

import { useMemo } from "react";

const CallVisualizer = ({ isTalking }: { isTalking: boolean }) => {
  const bars = useMemo(() => {
    return Array.from({ length: 200 }).map(() => ({
      height: Math.random() * 60 + 20,
      duration: 0.4 + Math.random() * 0.2,
      delay: Math.random() * 0.5,
    }));
  }, []); // ← this ensures values only generate once

  return (
    <div className="w-[500px] overflow-hidden ">
      <div className="flex items-center gap-1 h-32  w-fit">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="w-[1px] bg-gradient-to-b from-primary1/30 to-primary1/80 rounded-full"
            style={{
              height: `${bar.height}px`,
              animation: `barBounce ${bar.duration}s ease-in-out infinite`,
              animationDelay: `${bar.delay}s`,
              animationPlayState: isTalking ? "running" : "paused",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CallVisualizer;
