import { NextResponse, NextRequest } from 'next/server';
import { getNotes, addNote } from '@/lib/notes';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    return NextResponse.json(getNotes());
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { from, to, message, key, music } = body;

        if (!from || !to || !message || !key) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validasi dan sanitasi musik jika ada
        let safeMusic = undefined;

        if (music && typeof music === 'object') {
            safeMusic = {
                title: String(music.title || ''),
                artist: String(music.artist || ''),
                trackId: String(music.trackId || ''),
                deezerUrl: String(music.deezerUrl || ''),
            };
        }

        const newNote = addNote({
            id: uuidv4(),
            key,
            from,
            to,
            message,
            createdAt: Date.now(),
            music: safeMusic, // optional
        });

        return NextResponse.json(newNote, { status: 201 });

    } catch (error) {
        console.error('Error creating note:', error);
        return NextResponse.json(
            { error: String(error instanceof Error ? error.message : error) },
            { status: 400 }
        );
    }
}