import Game from "@/interfaces/Game";
import { findCompany } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
    url: string,
    data: Game
}

const DetailsHeader: React.FC<Props> = ({url, data}) => {
    return (
        <div className="flex gap-6 items-start">
            {url ? (
                <div className="relative w-[120px] aspect-[2/3]">
                    <Image
                        src={`https:${url}`}
                        alt="Portada juego"
                        fill
                        quality={100}
                        className="rounded-lg object-cover"
                    />
                </div>
            ) : (
                <div>No cover image available</div>
            )}
            <div className="flex-1">
                <h3 className="font-bold text-primary text-xl">{data?.name}</h3>
                <h3 className="text-primary font-semibold opacity-80">
                    {findCompany(data?.involved_companies)?.name}
                </h3>
            </div>
        </div>
    );
};

export default DetailsHeader;
