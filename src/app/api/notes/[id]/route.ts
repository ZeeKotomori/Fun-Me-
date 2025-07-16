import { NextRequest, NextResponse } from 'next/server';
import { getNotes, updateNote, deleteNote } from '@/lib/notes';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    const notes = getNotes();
    const note = notes.find((n) => n.id === params.id);

    if (!note) {
        return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(note);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const body = await req.json();

        const { from, to, message, key, music } = body;

        if (!from || !to || !message || !key) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const notes = getNotes();
        const note = notes.find((n) => n.id === id);

        if (!note) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }

        if (note.key !== key) {
            return NextResponse.json({ error: 'Invalid key' }, { status: 403 });
        }

        const updatedNote = {
            ...note,
            from,
            to,
            message,
            music: music || undefined,
        };

        updateNote(id, key ,updatedNote);

        return NextResponse.json(updatedNote, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: String(error instanceof Error ? error.message : error) },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, key } = body;

        if (!id || !key) {
            return NextResponse.json({ error: 'ID and Key are required' }, { status: 400 });
        }

        const deleted = deleteNote(id, key);
        if (!deleted) {
            return NextResponse.json({ error: 'Note not found or key invalid' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Note deleted successfully' });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
}