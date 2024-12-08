"use client";
import { ArrowLeft, Swords } from "lucide-react";
import React from "react";
import { GameSearchBar } from "../GameSearchBar";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
const Header = () => {
    const pathname = usePathname();
    const router = useRouter()
    let path = pathname.split("/");
    let page = path[1];
    return (
        <div className="w-full h-[200px] sm:h-[300px] justify-center mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF86D9] to-[#FF86D900] opacity-60 z-0"></div>
            <div className="w-full h-full bg-no-repeat bg-hero bg-auto sm:bg-contain absolute inset-0 z-10"></div>
            <div className="relative z-20 text-white flex items-center justify-center h-full">
                <div className="flex flex-col">
                    {page === "details" ? (
                        <div className="flex items-center gap-3" onClick={() => router.push('/')}>
                            <ArrowLeft className="text-primary w-7 h-7"/>
                            <h2 className="text-primary font-primary font-bold text-lg" >Back</h2>
                        </div>
                    ) : (
                        <div className="flex sm:justify-center justify-start gap-2 items-center">
                            <div className="border-2 border-[#FF86D9] rounded-2xl p-1 shadow-sm shadow-[#FF86D9] bg-gradient-to-b from-white to-[|#ff86d988]">
                                <Swords className="w-8 h-8 text-primary" />
                            </div>{" "}
                            <h2 className="font-bold text-2xl text-primary">
                                Gaming Haven Z
                            </h2>
                        </div>
                    )}

                    <div className="flex w-full max-w-xl mt-4 items-center bg-white rounded-full shadow-lg px-4 py-2">
                        <GameSearchBar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
