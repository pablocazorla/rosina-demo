"use client";
import TurnContent from "./turnContent";
import { TurnContextProvider } from "@/context/turn-context";

const HomePage = () => {
  return (
    <TurnContextProvider>
      <TurnContent />
    </TurnContextProvider>
  );
};

export default HomePage;
