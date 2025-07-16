'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PageWrapper from '../components/PageWrapper';
import Navbar from '../components/Navbar';

interface Note {
    id: string;
    from: string;
    to: string;
    message: string;
    createdAt: number;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        fetch('/api/notes')
            .then((res) => res.json())
            .then(setNotes);
    }, []);

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white">
        <PageWrapper>
            <Navbar />
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
                            <p className="text-sm mb-1">From: <strong>{note.from}</strong></p>
                            <p className="text-xs text-gray-300">To: {note.to}</p>
                            <p className="mt-2 text-xs italic line-clamp-3">&quot;{note.message}&quot;</p>
                        </div>

                        <Link
                            href={`/notes/${note.id}`}
                            className="mt-4 inline-block text-center text-sm bg-white text-black font-bold px-3 py-1 rounded hover:bg-gray-300 transition"
                        >
                            🔍 See Detail
                        </Link>
                    </div>
                ))}
            </div>
        </PageWrapper>
        </div>
    );
}
