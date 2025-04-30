"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";

const LottieAnimation = ({
  path,
  size = 100,
}: {
  path?: string;
  size?: number;
}) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (path) {
      setShowAnimation(true);
    }
  }, [path]);
  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      {showAnimation && (
        <DotLottieReact
          src={path}
          autoplay
          style={{
            width: "100%",
            height: "auto",
            opacity: "0.4",
            objectFit: "contain",
          }}
        />
      )}
      {!showAnimation && (
        <div className="flex justify-center items-center">
          <img
            src="/media/images/logo.png"
            alt="Loading..."
            className="w-10 h-10 animate-spin"
          />
        </div>
      )}
    </div>
  );
};

export default LottieAnimation;
