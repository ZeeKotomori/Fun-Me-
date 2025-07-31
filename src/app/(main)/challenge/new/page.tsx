'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function NewChallengePage() {
    const router = useRouter()
    const { data: session } = useSession()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        if (!session) {
            setError('Kamu harus login untuk menambahkan tantangan.')
            return
        }

        const res = await fetch('/api/challenge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                username: session.user?.name || 'anon',
            }),
        })

        if (res.ok) {
            router.push('/challenge')
        } else {
            setError('Gagal menambahkan tantangan.')
        }
    }

    return (
        <div className="p-6 text-white">
            <h1 className="text-xl font-bold mb-4">Buat Tantangan Baru</h1>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-2 p-2 bg-gray-800 text-white rounded"
                placeholder="Judul"
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mb-4 p-2 bg-gray-800 text-white rounded"
                placeholder="Deskripsi"
                rows={5}
            />

            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

            <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
                Simpan Tantangan
            </button>
        </div>
    )
}
