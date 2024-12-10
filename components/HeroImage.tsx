"use client";
import Image from "next/image";
import React from "react";

const HeroImage = () => {
    return (
        <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF86D9] to-[#FF86D900] opacity-60 z-0"></div>
            <Image
                src="/keys.webp" // Update with your actual hero image path
                alt="Hero Background"
                fill
                sizes="100%"
                priority
                className="object-cover sm:object-contain bg-no-repeat absolute inset-0 z-10 object-left sm:object-top"
                quality={90}
                loading="eager"
            />
        </>
    );
};

export default HeroImage;
