'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NumberInputPage() {
    const [input, setInput] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();

        if (!trimmed || isNaN(Number(trimmed))) {
            alert('Mohon masukkan angka yang valid.');
            return;
        }

        router.push(`/fun-fact/${trimmed}`);
    };

    return (
        <>
            <h1 className="text-xl font-bold mb-4">Find the Number Facts 🔢</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="input number here"
                    className="px-4 py-2 border rounded-lg text-white w-full max-w-xs text-center"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
                >
                    Find
                </button>
            </form>
        </>
    );
}
