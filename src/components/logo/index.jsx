import LogoSVG from "./svg";

const Logo = ({ ...props }) => {
  return (
    <div {...props}>
      <LogoSVG />
    </div>
  );
};

export default Logo;
