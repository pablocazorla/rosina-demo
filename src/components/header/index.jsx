"use client";
import Link from "next/link";
//import LogoSVG from "../logo/svg";
import Container from "../container";
import AccountMenuButton from "./account";
import { PRIVATE_ROUTES } from "@/config/routes";
import LogoHeader from "../logo/logo-header";

const Header = () => {
  return (
    <nav className="z-[999] w-full h-11 shadow-md  p-0 left-0 top-0 fixed bg-gradient-to-r from-white from-40% via-white   to-primary to-50%">
      <Container className="bg-primary pl-0 pr-0">
        <div className="flex items-center justify-between h-11">
          <div className="flex items-center gap-2">
            <Link href={PRIVATE_ROUTES.HOME.path} className="block">
              <LogoHeader />
            </Link>
            {/* <div className="main-header_col">
              <MainMenu />
            </div> */}
          </div>
          <div className="flex items-center gap-2">
            <AccountMenuButton />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Header;
