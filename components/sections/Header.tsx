"use client";
import React from "react";
import { usePathname } from "next/navigation";
import HeroImage from "../HeroImage";
import SearchBar from "../SearchbarContainer";
import BackButton from "../BackButton";
import Logo from "../Logo";

const Header = () => {
  const pathname = usePathname();
  const page = pathname.split("/")[1];

  return (
    <div className="w-full h-[200px] sm:h-[300px] justify-center mx-auto relative">
      <HeroImage />
      <div className="relative z-20 text-white flex items-center justify-self-center h-full max-w-screen-md w-full">
        <div
          className={`flex flex-col w-full px-4 md:px-0 ${
            page === "details" ? "md:flex-row" : "flex-col"
          }`}
        >
          {page === "details" ? <BackButton /> : <Logo />}
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Header;