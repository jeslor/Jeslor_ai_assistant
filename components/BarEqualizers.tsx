"use client";

const CallVisualizer = () => {
  return (
    <div className="flex items-end gap-1 h-32 w-full max-w-4xl mx-auto">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="w-1 bg-green-500 rounded"
          style={{
            height: `${Math.random() * 60 + 20}px`,
            animation: `barBounce ${
              0.4 + Math.random() * 0.8
            }s ease-in-out infinite`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default CallVisualizer;
