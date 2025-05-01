import React from "react";

type LoadingProps = {
  size?: number;
  color?: string;
};

const Loading = React.forwardRef<HTMLSpanElement, LoadingProps>(
  ({ size = 24, color = "gray" }, ref) => {
    return (
      <span
        ref={ref}
        style={{
          height: size,
          width: size,
          borderColor: color,
          borderTopColor: "transparent",
        }}
        className="inline-block animate-spin border-2 border-solid rounded-full border-t-transparent"
      ></span>
    );
  }
);

Loading.displayName = "Loading";

export default Loading;
