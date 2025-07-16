import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ error: 'Missing search query' }, { status: 400 });
    }

    try {
        const res = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(q)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0', // Deezer sometimes needs this
            },
        });

        const data = await res.json();
        return NextResponse.json(data.data); // hanya array data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch from Deezer' }, { status: 500 });
    }
}
