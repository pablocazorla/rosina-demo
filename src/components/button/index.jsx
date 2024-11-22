import clsx from "clsx";
const Button = ({
  children,
  size = "md",
  className,
  color = "primary",
  ...props
}) => {
  return (
    <button
      className={clsx(
        "font-bold hover:opacity-90 transition-opacity",
        {
          "bg-primary text-white ": color === "primary",
          "bg-secondary text-white": color === "secondary",
          "bg-tertiary text-gray-700": color === "tertiary",
          "py-1 px-3 text-sm rounded-md": size === "sm",
          "py-2 px-5 rounded-lg": size === "md",
          "py-3 px-8 text-xl rounded-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
