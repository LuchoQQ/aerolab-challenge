import React from "react";
import EmblaCarousel from "../carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

type Props = {
    carouselImages: string[]
}

const MediaSection: React.FC<Props> = ({carouselImages}) => {
    return (
        <div className="flex flex-col">
            <h3 className="font-bold text-xl">Media</h3>
            <div className="relative z-10">
                <EmblaCarousel slides={carouselImages} options={OPTIONS} />
            </div>
        </div>
    );
};

export default MediaSection;
