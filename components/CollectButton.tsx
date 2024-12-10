import Game from "@/interfaces/Game";
import useGameStore from "@/stores/gameStore";
import { Ban, Check } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

type Props = {
    isGameCollected: boolean;
    handleAddGame: (game: Game) => void;
    data: Game;
    id: number;
};

const CollectButton: React.FC<Props> = ({
    isGameCollected,
    handleAddGame,
    data,
    id,
}) => {
    const { removeGame } = useGameStore();

    const handleRemoveGame = (id: number) => {
        // Toast for removing game
        toast.custom((t) => (
            <div
                className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                }  bg-white shadow-lg rounded-lg pointer-events-auto flex px-8 py-4 w-[300px]`}
            >
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-center">Remove game from collection?</p>
                    <div className="flex justify-between">
                        <div
                            className="flex gap-1 cursor-pointer"
                            onClick={() => {
                                removeGame(Number(id));
                                toast.remove();
                                toast.success(
                                    `${data.name} removed from your collection`,
                                    {
                                        position: "bottom-center",
                                        style: {
                                            backgroundColor: "#ffffff",
                                            color: "text-primary",
                                            maxWidth: "400px",
                                            padding: "16px",
                                            borderRadius: "12px",
                                        },
                                        duration: 1000,
                                    }
                                );
                            }}
                        >
                            <Check className="text-green-500" />
                            Accept
                        </div>
                        <div className="flex gap-1 cursor-pointer" onClick={() => toast.remove()}>
                            <Ban className="text-red-500" />
                            Reject
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    const handleAddGameToast = () => {
        // Call the actual add game function
        handleAddGame(data);
        // Toast for adding game
        toast.success(`${data.name} added to your collection`, {
            position: "bottom-center",
            style: {
                backgroundColor: "#ffffff",
                color: "text-primary",
                maxWidth: "400px",
                padding: "16px",
                borderRadius: "12px",
            },
            duration: 1000,
        });
    };

    return isGameCollected ? (
        <div
            onClick={() => handleRemoveGame(id)}
            className="text-center bg-white mt-6 p-3 rounded-full text-quartery font-bold border-2 border-primary md:max-w-40 cursor-pointer"
        >
            Game collected
        </div>
    ) : (
        <div
            className="text-center bg-primary mt-6 p-3 rounded-full text-white font-bold md:max-w-40 cursor-pointer"
            onClick={handleAddGameToast}
        >
            Collect game
        </div>
    );
};

export default CollectButton;
