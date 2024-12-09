import Game from "@/interfaces/Game";
import React from "react";
import toast from "react-hot-toast";


type Props = {
    isGameCollected: boolean,
    handleAddGame: (game: Game) => void;
    data: Game;
}

const CollectButton: React.FC<Props> = ({ isGameCollected, handleAddGame, data }) => {
    const notify = () =>
        toast("Game collected!!", {
            duration: 4000,
            position: "bottom-center",

            // Styling
            style: {},
            className: "",

            // Custom Icon
            icon: "👏",

            // Change colors of success/error/loading icon
            iconTheme: {
                primary: "#0fc909",
                secondary: "#fff",
            },
        });
    return (
        <>
            {isGameCollected ? (
                <>
                    <div className="text-center bg-white mt-6 p-3 rounded-full text-quartery font-bold border-2 border-primary md:max-w-40 cursor-pointer">
                        Game collected
                    </div>
                </>
            ) : (
                <div
                    className="text-center bg-primary mt-6 p-3 rounded-full text-white font-bold md:max-w-40 cursor-pointer"
                    onClick={() => {
                        handleAddGame(data);
                        notify();
                    }}
                >
                    Collect game
                </div>
            )}
        </>
    );
};

export default CollectButton;
