'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store'
import { LoginPromptModal } from '../../../components/LoginPromptModal'
import { useSession } from 'next-auth/react'
import { addUpvote, removeUpvote } from '@/store/upvoteSlice';
import { addDownvote, removeDownvote } from '@/store/downvoteSlice';

interface Note {
    id: string
    from: string
    to: string
    message: string
    createdAt: number
    upvotes: number
    downvote: number
}

export default function NotesPage() {
    const { data: session } = useSession()
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState<Note[]>([])
    const dispatch = useAppDispatch()
    const upvotedIds = useAppSelector((state) => state.upvotes.upvotesIds)
    const downvoteIds = useAppSelector((state) => state.downvotes.downvotesIds)

    useEffect(() => {
        fetch('/api/notes')
            .then((res) => res.json())
            .then(setNotes)
    }, [])

    const handleUpvote = async (noteId: string) => {
        if (!session) {
            setShowModal(true);
            return;
        }

        const res = await fetch(`/api/notes/upvote/${noteId}/`, { method: 'POST' });
        const data = await res.json();

        if (data.success) {
            dispatch(addUpvote(noteId));
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === noteId ? { ...note, upvotes: note.upvotes + 1 } : note
                )
            );
        }
    };

    const handleDownvote = async (noteId: string) => {
        if (!session) {
            setShowModal(true);
            return;
        }

        const res = await fetch(`/api/notes/downvote/${noteId}`, { method: 'POST' });
        const data = await res.json();

        if (data.success) {
            dispatch(addDownvote(noteId));
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === noteId ? { ...note, downvote: note.downvote + 1 } : note
                )
            );
        }
    };


    const handleRemoveUpvote = async (noteId: string) => {
        if (!session) return;

        const res = await fetch(`/api/notes/upvote/${noteId}`, { method: 'DELETE' });
        const data = await res.json();

        if (data.success) {
            dispatch(removeUpvote(noteId));
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === noteId ? { ...note, upvotes: note.upvotes - 1 } : note
                )
            );
        }
    };

    const handleRemoveDownvote = async (noteId: string) => {
        if (!session) return;

        const res = await fetch(`/api/notes/downvote/${noteId}`, { method: 'DELETE' });
        const data = await res.json();

        if (data.success) {
            dispatch(removeDownvote(noteId));
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === noteId ? { ...note, downvote: note.downvote - 1 } : note
                )
            );
        }
    };


    return (
        <div className='flex flex-col min-h-screen text-white p-6'>
            <div className="flex justify-between items-center mb-6">
                <Link
                    href="/notes/new"
                    className="bg-white text-black px-3 py-1 rounded hover:bg-gray-300 transition"
                >
                    ➕ Add Note
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="bg-white/10 hover:bg-white/20 transition-all border border-white/20 p-4 rounded-lg flex flex-col justify-between"
                    >
                        <div>
                            <p className="text-sm mb-1">
                                From: <strong>{note.from}</strong>
                            </p>
                            <p className="text-xs text-gray-300">To: {note.to}</p>
                            <p className="mt-2 text-xs italic line-clamp-3">
                                &quot;{note.message}&quot;
                            </p>
                        </div>

                        <div className="mt-3 flex justify-between items-center text-sm">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() =>
                                        upvotedIds.includes(note.id)
                                            ? handleRemoveUpvote(note.id)
                                            : handleUpvote(note.id)
                                    }
                                    className={`px-2 py-1 cursor-pointer rounded ${upvotedIds.includes(note.id)
                                        ? 'bg-red-500 hover:bg-red-600'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                        }`}
                                >
                                    👍 {note.upvotes}
                                </button>

                                <button
                                    onClick={() =>
                                        downvoteIds.includes(note.id)
                                            ? handleRemoveDownvote(note.id)
                                            : handleDownvote(note.id)
                                    }
                                    className={`px-2 py-1 cursor-pointer rounded ${downvoteIds.includes(note.id)
                                        ? 'bg-red-500 hover:bg-red-600'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                        }`}
                                >
                                    👎 {note.downvote}
                                </button>


                            </div>

                            <Link
                                href={`/notes/${note.id}`}
                                className="text-sm bg-white text-black font-bold px-3 py-1 rounded hover:bg-gray-300 transition"
                            >
                                🔍 See Detail
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && <LoginPromptModal onClose={() => setShowModal(false)} />}
        </div>
    )
}
