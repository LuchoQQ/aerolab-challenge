import Image from "next/image";
import React from "react";

const NoItemsCollected = () => {
    return (
        <div className="flex justify-center mt-auto mt-2">
            <div>
                <Image
                    src="/empty.webp"
                    alt="no items"
                    height={300}
                    width={300}
                />
                <h3 className="text-center font-bold text-xl">
                    Nothing collected yet
                </h3>
                <h4 className="text-center text-sm">
                    Here you will see your collected games
                </h4>
            </div>
        </div>
    );
};

export default NoItemsCollected;
