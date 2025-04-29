const Loading = ({
  size = 24,
  color = "gray",
  ref = null,
}: {
  size?: number;
  color?: string;
  ref?: React.Ref<HTMLSpanElement>;
}) => {
  return (
    <span
      ref={ref}
      style={{
        height: size,
        width: size,
        borderColor: color,
        borderTopColor: "transparent",
      }}
      className="inline-block animate-spin border-2 border-solid rounded-full border-t-transparent "
    ></span>
  );
};

export default Loading;
