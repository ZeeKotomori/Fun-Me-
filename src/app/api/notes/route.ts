import { NextResponse, NextRequest } from 'next/server';
import { getNotes, addNote } from '@/lib/notes';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    const notes = await getNotes();
    return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { from, to, message, key, music } = body;

        if (!from || !to || !message || !key) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const safeMusic = music && typeof music === 'object'
            ? {
                title: String(music.title || ''),
                artist: String(music.artist || ''),
                trackId: String(music.trackId || ''),
                deezerUrl: String(music.deezerUrl || ''),
            }
            : null;

        const newNote = await addNote({
            id: uuidv4(),
            key,
            from,
            to,
            message,
            music: safeMusic,
            expiredDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        console.error('Error creating note:', error);
        return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
    }
}
