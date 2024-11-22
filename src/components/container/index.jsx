import clsx from "clsx";

const Container = ({ children, className, full }) => {
  return (
    <div
      className={clsx(
        "mx-auto px-3",
        {
          "max-w-md": !full,
          "max-w-6xl": full,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
