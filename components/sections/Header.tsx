"use client";
import { ArrowLeft, Swords } from "lucide-react";
import React from "react";
import { GameSearchBar } from "../GameSearchBar";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Header = () => {
    const pathname = usePathname();
    const path = pathname.split("/");
    const page = path[1];
    return (
        <div className="w-full  h-[200px] sm:h-[300px] justify-center mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF86D9] to-[#FF86D900] opacity-60 z-0"></div>
            <div className="w-full h-full bg-no-repeat bg-hero bg-auto sm:bg-contain absolute inset-0 z-10"></div>
            <div className="relative z-20 text-white flex items-center justify-self-center h-full max-w-screen-md w-full">
                <div
                    className={`flex flex-col w-full px-4 md:px-0 ${
                        page === "details" ? "md:flex-row " : "flex-col"
                    }`}
                >
                    {page === "details" ? (
                        <Link href="/" passHref className="flex items-center">
                            <div className="flex items-center gap-3 mr-auto md:mr-auto">
                                <ArrowLeft className="text-primary w-7 h-7" />
                                <h2 className="text-primary font-primary font-bold text-lg">
                                    Back
                                </h2>
                            </div>
                        </Link>
                    ) : (
                        <Link href="/" className="block">
                            <div className="flex sm:justify-center justify-start gap-2 items-center">
                                <div className="border-2 border-[#FF86D9] rounded-2xl p-1 shadow-sm shadow-[#FF86D9] bg-gradient-to-b from-white to-[#ff86d988]">
                                    <Swords className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="font-bold text-2xl text-primary font-sans">
                                    Gaming Haven Z
                                </h2>
                            </div>
                        </Link>
                    )}

                    <div className="flex justify-center md:mr-auto md:ml-auto">
                        <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 mt-4 mt-4 max-w-[500px] w-full border-[#F6ADDF] border-2">
                            <GameSearchBar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
