'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditChallenge() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        if (!params?.id) return

        fetch(`/api/challenge/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title)
                setDescription(data.description)
            })
    }, [params?.id])

    const handleUpdate = async () => {
        await fetch(`/api/challenge/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        })
        router.push('/challenge')
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

            <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
                Simpan Tantangan
            </button>
        </div>
    )
}
