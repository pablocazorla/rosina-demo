import Link from "next/link";
import I18N from "@/i18n";

const ItemMenu = ({ menuItem, setVisibleMobileMenu }) => {
  const { title, path } = menuItem;

  return (
    <Link
      href={path}
      className="block p-4 font-bold bg-gray-300/60 text-black hover:bg-gray-800 hover:text-white transition-colors"
      onClick={() => {
        setVisibleMobileMenu(false);
      }}
    >
      <I18N id={title} />
    </Link>
  );
};

export default ItemMenu;
