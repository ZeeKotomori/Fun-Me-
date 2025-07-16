'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import PageWrapper from '@/app/components/PageWrapper';
import NavBar from '@/app/components/Navbar';

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

export default function EditNotePage() {
    const params = useParams();
    const router = useRouter();

    const [note, setNote] = useState<Note | null>(null);
    const [form, setForm] = useState({
        from: '',
        to: '',
        message: '',
        key: '',
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Music[]>([]);
    const [selectedMusic, setSelectedMusic] = useState<Music | undefined>(undefined);

    useEffect(() => {
        fetch(`/api/notes/${params.id}`)
            .then((res) => res.json())
            .then((data: Note) => {
                setNote(data);
                setForm({
                    from: data.from,
                    to: data.to,
                    message: data.message,
                    key: data.key,
                });

                if (data.music) {
                    setSearchQuery(`${data.music.title} - ${data.music.artist}`);
                    setSelectedMusic(data.music);
                }
            });
    }, [params.id]);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchQuery.length > 1) {
                fetch(`/api/deezer?q=${encodeURIComponent(searchQuery)}`)
                    .then((res) => res.json())
                    .then((tracks) => {
                        type DeezerTrack = {
                            title: string;
                            artist: { name: string };
                            id: number | string;
                            link: string;
                        };
                        const mapped: Music[] = tracks.map((t: DeezerTrack) => ({
                            title: t.title,
                            artist: t.artist.name,
                            trackId: t.id.toString(),
                            deezerUrl: t.link,
                        }));
                        setSearchResults(mapped);
                    });
            } else {
                setSearchResults([]);
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [searchQuery]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updated = {
            ...form,
            music: selectedMusic ?? undefined,
        };

        const res = await fetch(`/api/notes/${params.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated),
        });

        if (res.ok) {
            toast.success('Note updated!');
            router.push(`/notes/${params.id}`);
        } else {
            const err = await res.json();
            toast.error('Failed to update: ' + (err.error ?? 'unknown error'));
        }
    };

    if (!note) return <div className="text-white p-4">Loading...</div>;

    return (
        <div className='bg-[#0a0a0a] min-h-screen text-white'>
        <PageWrapper>
            <NavBar />
            <h1 className="text-xl font-bold mb-4">Edit Note</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    value={form.from}
                    onChange={(e) => setForm({ ...form, from: e.target.value })}
                    placeholder="From"
                    className="bg-black border border-white/20 px-3 py-2 rounded"
                    required
                />
                <input
                    value={form.to}
                    onChange={(e) => setForm({ ...form, to: e.target.value })}
                    placeholder="To"
                    className="bg-black border border-white/20 px-3 py-2 rounded"
                    required
                />
                <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Your message"
                    className="bg-black border border-white/20 px-3 py-2 rounded"
                    required
                />
                <input
                    value={form.key}
                    onChange={(e) => setForm({ ...form, key: e.target.value })}
                    placeholder="Your key"
                    className="bg-black border border-white/20 px-3 py-2 rounded"
                    required
                />

                <div>
                    <input
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setSelectedMusic(undefined); // kosongkan jika ganti input
                        }}
                        placeholder="Search music (e.g. Alan Walker)"
                        className="bg-black border border-white/20 px-3 py-2 rounded w-full"
                    />
                    {searchResults.length > 0 && (
                        <ul className="bg-black/10 border border-white/10 rounded mt-1 max-h-48 overflow-auto shadow-lg">
                            {searchResults.map((music) => (
                                <li
                                    key={music.trackId}
                                    className="cursor-pointer hover:bg-white/10 px-2 py-1 rounded"
                                    onClick={() => {
                                        setSelectedMusic(music);
                                        setSearchQuery(`${music.title} - ${music.artist}`);
                                        setSearchResults([]);
                                    }}
                                >
                                    🎵 {music.title} — {music.artist}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    💾 Save Changes
                </button>
            </form>
        </PageWrapper>
        </div>
    );
}
