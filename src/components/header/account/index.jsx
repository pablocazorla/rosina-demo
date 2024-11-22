"use client";
import { useStore } from "@/store";
import Avatar from "@/components/avatar";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import useHeaderAccount from "./useHeaderAccount";
import HeadContent from "../head-content";
import MainMenu from "../menu";

const AccountMenuButton = () => {
  const { user } = useStore((state) => state.data);
  const { show, visibleMobile, toggleMobile, signOut } = useHeaderAccount();

  return show ? (
    <div className="relative">
      <button className="cursor-pointer h-11 w-11" onClick={toggleMobile}>
        <Icon type="menu" className="text-white text-2xl" />
      </button>

      <HeadContent visibleMobile={visibleMobile} toggleMobile={toggleMobile}>
        <div className="text-center pt-6 pb-1 max-w-xs mx-auto">
          <div className="w-[80px] mx-auto mb-2">
            <Avatar user={user} width={80} />
          </div>
          <h3 className="font-bold text-2xl text-gray-500 mb-5">{`${
            user?.firstname || ""
          }`}</h3>
          <MainMenu toggleMobile={toggleMobile} />
          <nav className="pt-1">
            <button
              href="/"
              className="block hover:bg-danger hover:text-white w-full text-danger font-bold p-4 transition-colors"
              onClick={() => {
                toggleMobile();
                signOut();
              }}
            >
              <div className="flex items-center justify-center gap-1">
                <Icon type="signout" />
                <I18N id="sign.SignOut" />
              </div>
            </button>
          </nav>
        </div>
      </HeadContent>
    </div>
  ) : null;
};

export default AccountMenuButton;
