"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
//import PrivateEnvironment from "@/environments/private";

import { AppContextProvider } from "@/context/appContext";
import dynamic from "next/dynamic";

const PrivateEnvironmentNoSSR = dynamic(
  () => import("@/environments/private"),
  {
    ssr: false,
  }
);

export default function RosLayout({ children }) {
  return (
    <PrivateEnvironmentNoSSR>
      <AppContextProvider>
        <Header />
        <div className="relative w-full min-h-screen py-11">
          <a id="a-top" />
          <main className="relative py-4">{children}</main>
          <Footer />
        </div>
      </AppContextProvider>
    </PrivateEnvironmentNoSSR>
  );
}
