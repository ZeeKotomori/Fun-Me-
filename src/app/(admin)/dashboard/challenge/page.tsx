'use client'

import { useEffect, useState } from 'react'

type Challenge = {
    id: number
    title: string
    description: string
}

export default function ChallengePage() {
    const [challenges, setChallenges] = useState<Challenge[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        fetchChallenges()
    }, [])

    const fetchChallenges = async () => {
        const res = await fetch('/api/challenge')
        const data = await res.json()
        setChallenges(data)
    }

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm('Yakin ingin menghapus challenge ini?')
        if (!confirmDelete) return

        await fetch(`/api/challenge/${id}`, { method: 'DELETE' })
        fetchChallenges()
    }

    const handleCreateOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = { title, description }

        try {
            if (selectedChallenge) {
                await fetch(`/api/challenge/${selectedChallenge.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })
            } else {
                await fetch('/api/challenge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })
            }

            fetchChallenges()
            closeModal()
        } catch (error) {
            console.error('Gagal menyimpan challenge:', error)
            alert('Terjadi kesalahan saat menyimpan challenge.')
        }
    }

    const openCreateModal = () => {
        setSelectedChallenge(null)
        setTitle('')
        setDescription('')
        setIsModalOpen(true)
    }

    const openEditModal = (challenge: Challenge) => {
        setSelectedChallenge(challenge)
        setTitle(challenge.title)
        setDescription(challenge.description)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedChallenge(null)
        setTitle('')
        setDescription('')
        setIsModalOpen(false)
    }

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-semibold">Manajemen Challenge</h1>
                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Tambah Challenge
                </button>
            </div>

            <div className="overflow-x-auto bg-gray-800 rounded shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-900 text-left">
                        <tr>
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">Judul</th>
                            <th className="px-4 py-2">Deskripsi</th>
                            <th className="px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {challenges.length > 0 ? (
                            challenges.map((challenge, index) => (
                                <tr key={challenge.id} className="border-t border-gray-700">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{challenge.title}</td>
                                    <td className="px-4 py-2">{challenge.description}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => openEditModal(challenge)}
                                            className="text-yellow-400 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(challenge.id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center p-4 text-gray-500">
                                    Tidak ada challenge.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-6 rounded shadow w-96">
                        <h2 className="text-lg font-semibold mb-4 text-white">
                            {selectedChallenge ? 'Edit Challenge' : 'Tambah Challenge'}
                        </h2>

                        <form onSubmit={handleCreateOrUpdate} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Judul"
                                className="w-full border p-2 rounded text-white bg-gray-700 placeholder-gray-400"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Deskripsi"
                                className="w-full border p-2 rounded text-white bg-gray-700 placeholder-gray-400 resize-none"
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />

                            <div className="flex justify-end space-x-2 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
