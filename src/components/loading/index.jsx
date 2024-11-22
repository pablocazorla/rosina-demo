import clsx from "clsx";

const LoadingBox = ({
  loading,
  className,
  transparent,
  min,
  center,
  zIndex,
}) => {
  return loading ? (
    <div
      className={clsx("loading-box", className, { transparent, min, center })}
      style={zIndex ? { zIndex } : null}
    >
      <div className="w-14 h-14 border-8 border-primary/90 border-t-transparent rounded-full animate-rotate" />
    </div>
  ) : null;
};

export default LoadingBox;
