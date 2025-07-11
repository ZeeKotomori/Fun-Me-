'use client';

import { useEffect, useState } from 'react';

interface Fact {
    text: string;
    source: string;
    source_url: string;
}

export default function RandomFact() {
    const [fact, setFact] = useState<Fact | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchFact = async () => {
        setLoading(true);
        const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
        const data = await res.json();
        setFact(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchFact();
    }, []);

    return (
        <div className="text-center max-w-xl">
            <h1 className="text-xl font-bold mb-4">Fact of the day 🎉</h1>

            {loading ? (
                <p className="italic text-gray-400">Loading...</p>
            ) : (
                <>
                    <p className="text-base italic">“{fact?.text}”</p>
                </>
            )}

            <button
                onClick={fetchFact}
                className="mt-6 px-4 py-2 bg-white text-black rounded-full border hover:bg-gray-200 transition"
            >
                🔄 Find New Fact
            </button>
        </div>
    );
}
