import clsx from "clsx";

const Card = ({ children, className }) => {
  return (
    <div className={clsx("bg-white rounded-xl shadow-md", className)}>
      {children}
    </div>
  );
};

export default Card;
