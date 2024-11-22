"use client";
import Container from "../container";
import { DOCUMENT_TITLE } from "@/config/doc";

const Footer = () => {
  return (
    <footer className="absolute w-full h-11 leading-[43px] text-xs text-center left-0 bottom-0">
      <Container>
        <div className="border-t border-gray-400">
          {new Date().getFullYear()} - {DOCUMENT_TITLE}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
