"use client";
import ItemMenu from "./itemMenu";
import { MenuList } from "./config";

const MainMenu = ({ toggleMobile }) => {
  return (
    <menu>
      <ul className="text-center border-t border-b border-gray-300 py-1">
        {MenuList.map((menuItem) => {
          return (
            <li key={menuItem.title} className="py-1">
              <ItemMenu
                menuItem={menuItem}
                setVisibleMobileMenu={toggleMobile}
              />
            </li>
          );
        })}
      </ul>
    </menu>
  );
};

export default MainMenu;
