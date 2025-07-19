/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { updateNote, deleteNote, findNoteById } from '@/lib/notes';

function extractIdFromUrl(req: NextRequest): string | null {
    const segments = req.nextUrl.pathname.split('/');
    return segments[segments.length - 1] || null;
}

export async function GET(req: NextRequest) {
    try {
        const id = extractIdFromUrl(req);
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const note = await findNoteById(id);
        if (!note) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }

        return NextResponse.json(note);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to retrieve note' }, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    try {
        const id = extractIdFromUrl(req);
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const body = await req.json();
        const { from, to, message, key, music } = body;

        if (!id || !from || !to || !message || !key) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const updatedNote = await updateNote(id, key, { from, to, message, music });

        if (!updatedNote) {
            return NextResponse.json({ error: 'Note not found or key invalid' }, { status: 404 });
        }

        return NextResponse.json(updatedNote);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = extractIdFromUrl(req);
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const body = await req.json();
        const { key } = body;

        if (!id || !key) {
            return NextResponse.json({ error: 'ID and Key are required' }, { status: 400 });
        }

        const deleted = await deleteNote(id, key);
        if (!deleted) {
            return NextResponse.json({ error: 'Note not found or key invalid' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Note deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
