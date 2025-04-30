"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottieAnimation = ({
  path,
  size = 100,
}: {
  path?: string;
  size?: number;
}) => {
  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <DotLottieReact
        src={path}
        loop
        autoplay
        style={{
          width: "100%",
          height: "auto",
          opacity: "0.4",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default LottieAnimation;
