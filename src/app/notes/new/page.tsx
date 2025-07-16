'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/app/components/PageWrapper';
import Navbar from '@/app/components/Navbar';

interface MusicSuggestion {
    id: number;
    title: string;
    artist: { name: string };
    link: string;
}

export default function NewNotePage() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [key, setKey] = useState('');
    const [musicSearch, setMusicSearch] = useState('');
    const [musicResults, setMusicResults] = useState<MusicSuggestion[]>([]);
    const [selectedMusic, setSelectedMusic] = useState<MusicSuggestion | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const note = {
            from,
            to,
            key,
            message,
            music: selectedMusic
                ? {
                    title: selectedMusic.title,
                    artist: selectedMusic.artist.name,
                    trackId: String(selectedMusic.id),
                    deezerUrl: selectedMusic.link,
                }
                : undefined,
        };

        const res = await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note),
        });

        if (res.ok) {
            router.push('/notes');
        } else {
            const errorText = await res.text();
            alert('Failed create note: ' + errorText);
        }
    };

    useEffect(() => {
        if (musicSearch.length < 3) return;

        const delay = setTimeout(() => {
            fetch(`/api/deezer?q=${encodeURIComponent(musicSearch)}`)
                .then((res) => res.json())
                .then((data) => setMusicResults(data || []))
                .catch(() => setMusicResults([]));
        }, 500);

        return () => clearTimeout(delay);
    }, [musicSearch]);


    return (
        <PageWrapper>
            <Navbar />
            <h1 className="text-xl font-bold mb-4">Create Note</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    placeholder="From"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="border px-3 py-2 rounded bg-black/20"
                    required
                />
                <input
                    placeholder="To"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="border px-3 py-2 rounded bg-black/20"
                    required
                />
                <input
                    placeholder="Key (used to edit/delete)"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="border px-3 py-2 rounded bg-black/20"
                    required
                />
                <textarea
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border px-3 py-2 rounded bg-black/20"
                    required
                />

                <input
                    placeholder="Search music (e.g. Alan Walker)"
                    value={musicSearch}
                    onChange={(e) => {
                        setMusicSearch(e.target.value);
                        setSelectedMusic(null); // reset selected if user changes query
                    }}
                    className="border px-3 py-2 rounded bg-black/20"
                />

                {musicResults.length > 0 && (
                    <ul className="bg-black/10 border border-white/10 rounded p-2 max-h-40 overflow-y-auto">
                        {musicResults.map((track) => (
                            <li
                                key={track.id}
                                className="cursor-pointer hover:bg-white/10 px-2 py-1 rounded"
                                onClick={() => {
                                    setSelectedMusic(track);
                                    setMusicSearch(`${track.title} - ${track.artist.name}`);
                                    setMusicResults([]);
                                }}
                            >
                                🎵 {track.title} - {track.artist.name}
                            </li>
                        ))}
                    </ul>
                )}

                {selectedMusic && (
                    <p className="text-green-400 text-sm italic">
                        Selected: {selectedMusic.title} by {selectedMusic.artist.name}
                    </p>
                )}

                <button className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-300">
                    Submit Note
                </button>
            </form>
        </PageWrapper>
    );
}
