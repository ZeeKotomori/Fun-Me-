/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { updateNote, deleteNote, findNoteById } from '@/lib/notes'

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop() // Ambil id dari URL
        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

        const note = await findNoteById(id)
        if (!note) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 })
        }

        return NextResponse.json(note)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to retrieve note' }, { status: 500 })
    }
}
export async function PUT(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop() // Ambil id dari URL
        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

        const body = await req.json()
        const { key, ...data } = body

        if (!key) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const updatedNote = await updateNote(id, key, data)
        if (!updatedNote) {
            return NextResponse.json({ error: 'Note not found or key mismatch' }, { status: 404 })
        }

        return NextResponse.json(updatedNote)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update note' }, { status: 500 })
    }
}
export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop() // Ambil id dari URL
        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

        const key = req.body ? (await req.json()).key : null
        if (!key) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const deleted = await deleteNote(id, key)
        if (!deleted) {
            return NextResponse.json({ error: 'Note not found or key mismatch' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
    }
}