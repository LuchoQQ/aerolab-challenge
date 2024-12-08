import React from "react";

const CardsContainer = () => {
    return (
        <main className="container mx-auto px-4 relative">
            <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {data &&
                    data.map((game) => (
                        <Card key={game.id} className="overflow-hidden">
                            <div className="h-48 relative">
                                <Image
                                    src={game.cover?.url || "/placeholder.png"}
                                    alt={game.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <CardHeader>
                                <CardTitle>{game.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {game.summary}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </main>
    );
};

export default CardsContainer;
