/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { updateNote, deleteNote, findNoteById } from '@/lib/notes';
import { prisma } from '@/lib/prisma';

export async function GET({params} : {params : Promise<{ id: string }>}) {
    const { id } = await params;
    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const note = await prisma.note.findUnique({
        where: { id },
    });

    if (!note) {
        return new Response(JSON.stringify({ error: 'Note not found' }), {
            status: 404,
        });
    }

    return new Response(JSON.stringify(note), {
        headers: { 'Content-Type': 'application/json' },
    });
}


export async function PUT(req: Request, {params} : {params : Promise<{ id: string }>}) {
    const { id } = await params;
    try {
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

export async function DELETE(req: Request, {params} : {params : Promise<{ id: string }>}) {
    try {
        const { id } = await params;
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
