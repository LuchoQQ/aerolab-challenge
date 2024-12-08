
import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = "https://api.igdb.com/v4/games"


export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const response = await axios.post(BASE_URL,
            `fields cover.url; where id = ${params.id};`,
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
