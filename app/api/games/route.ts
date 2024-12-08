import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = "https://api.igdb.com/v4/games"

export async function GET() {
    try {
        const response = await axios.post(BASE_URL,
            'fields name, summary,aggregated_rating, genres.name, platforms.name, checksum, involved_companies, rating,screenshots, videos, first_release_date; limit 10;',
            {
                headers: {
                    'Client-ID': process.env.IGDB_CLIENT_ID,
                    'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
                    'Accept': 'application/json',
                    'Content-Type': 'text/plain'
                }
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching games:', error);
        return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { name } = await req.json();

        const response = await axios.post(
            BASE_URL,
            `fields name, summary, cover.*, aggregated_rating, genres.name, platforms.name, checksum, involved_companies, rating, screenshots.*, videos, first_release_date; limit 10; search "${name}";
            `,
            {
                headers: {
                    'Client-ID': process.env.IGDB_CLIENT_ID,
                    'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
                    'Content-Type': 'text/plain',
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching games:", error);
        return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
    }
}
