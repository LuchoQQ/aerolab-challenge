export default interface Game {
    id: number;
    name: string;
    cover: { url: string } | null;
    first_release_date: number;
    added: number;
    summary: string;
    platforms: string[];
    rating: number;
    involved_companies: InvolvedCompanies[];
    screenshots: { url: string }[];
    genres: { name: string }[];
    similar_games: number[];
    url: string;
}



export interface Platform {
    name: string
}

export interface InvolvedCompanies {
    id: number
    company: {
        id: number,
        logo: number;
        name: string
    }
    developer: boolean,
    publisher: boolean
}

export interface SimilarGames {

}

export interface Screenshots {
    id: number,
    game: number,
    height: number
    image_id: string,
    url: string,
    width: number,
    checksum: string
}

export interface Genre {
    name: string
}