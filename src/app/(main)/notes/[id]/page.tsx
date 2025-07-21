'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Music {
    title: string;
    artist: string;
    trackId: string;
    deezerUrl: string;
}

interface Note {
    id: string;
    from: string;
    to: string;
    message: string;
    key: string;
    music?: Music;
    createdAt: number;
}

function DeezerPlayer({ trackId }: { trackId: string }) {
    return (
        <iframe
            title="Deezer Player"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            src={`https://widget.deezer.com/widget/dark/track/${trackId}`}
            width="100%"
            height="90"
            className="rounded mt-2"
        />
    );
}

export default function NoteDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [note, setNote] = useState<Note | null>(null);
    const [keyInput, setKeyInput] = useState('');
    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        fetch(`/api/notes/${params.id}`)
            .then((res) => res.json())
            .then(setNote);
    }, [params.id]);

    const handleUnlock = () => {
        if (keyInput === note?.key) {
            setUnlocked(true);
        } else {
            toast.error('Invalid key. Please try again.');
        }
    };

    const handleDelete = async () => {
        if (!note) return;

        toast.custom((t) => (
            <div className="bg-[#0a0a0a] text-white p-4 rounded shadow-lg w-[300px] flex flex-col gap-3 broder border-solid border-2 border-red-500/80">
                <span>Are you sure you want to delete this note?</span>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => toast.dismiss(t)}
                        className="text-sm px-3 py-1 rounded bg-gray-600 hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            const res = await fetch(`/api/notes/${note.id}`, {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: note.id, key: keyInput }),
                            });

                            toast.dismiss(t);

                            if (res.ok) {
                                toast.success('Note deleted successfully');
                                router.push('/notes');
                            } else {
                                const err = await res.json();
                                toast.error('Failed to delete note: ' + (err.error ?? 'unknown'));
                            }
                        }}
                        className="text-sm px-3 py-1 rounded bg-red-600/80 hover:bg-red-500/80"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        ));
    };



    if (!note) return <div className="text-white p-4">Loading...</div>;

    return (
        <>
            <div className="mt-10 bg-white/10 border border-white/20 rounded-lg p-6 max-w-lg mx-auto">
                <p><strong>From:</strong> {note.from}</p>
                <p><strong>To:</strong> {note.to}</p>
                <p className="mt-2"><strong>Message:</strong> {note.message}</p>

                {note.music?.trackId && (
                    <div className="mt-4">
                        <p className="text-sm mb-2">
                            🎵 <a href={note.music.deezerUrl} className="underline text-blue-400" target="_blank">
                                {note.music.title} by {note.music.artist}
                            </a>
                        </p>
                        <DeezerPlayer trackId={note.music.trackId} />
                    </div>
                )}

            </div>

            {/* KEY unlock */}
            <div className="max-w-lg mx-auto mt-4">
                <input
                    placeholder="Enter your key to Edit/Delete"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    className="w-full px-3 py-2 rounded border bg-black text-white mt-4"
                />

                <div className="flex mt-2 gap-2 flex-wrap">
                    <button
                        className="bg-white cursor-pointer hover:bg-gray-300 text-black px-4 py-2 rounded"
                        onClick={handleUnlock}
                    >
                        Unlock
                    </button>

                    {unlocked && (
                        <>
                            <button
                                className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-black px-4 py-2 rounded"
                                onClick={() => router.push(`/notes/edit/${note.id}`)}
                            >
                                Edit Note
                            </button>

                            <button
                                className="bg-red-600 cursor-pointer hover:bg-red-700 text-black px-4 py-2 rounded"
                                onClick={handleDelete}
                            >
                                Delete Note
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
