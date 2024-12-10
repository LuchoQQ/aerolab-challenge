"use client";
import { Swords } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
    return (
        <Link href="/" className="block">
            <div className="flex sm:justify-center justify-start gap-2 items-center">
                <div className="border-2 border-[#FF86D9] rounded-2xl p-1 shadow-sm shadow-[#FF86D9] bg-gradient-to-b from-white to-[#ff86d988]">
                    <Swords className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-bold text-2xl text-primary font">
                    Gaming Haven Z
                </h2>
            </div>
        </Link>
    );
};

export default Logo;
