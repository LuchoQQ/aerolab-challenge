import Game, { Platform } from "@/interfaces/Game";
import React from "react";

type Props = {
    data: Game;
};

const GameInfo: React.FC<Props> = ({ data }) => {
    return (
        <>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl">Summary</h3>
                <h4 className="text-sm font-medium opacity-70">
                    {data.summary}
                </h4>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl">Platforms</h3>
                <h4 className="text-sm font-medium opacity-70">
                    {data?.platforms
                        ?.map((platform: Platform) => platform.name)
                        .join(", ")}
                </h4>
            </div>
        </>
    );
};

export default GameInfo;
