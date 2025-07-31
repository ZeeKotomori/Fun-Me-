'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
// import { confirm } from 'sonner-confirm-dialog'

interface Challenge {
    id: string
    title: string
    description: string
    username: string
    createdAt: string
    userId: string
}

export default function ChallengeDetailPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const params = useParams()
    const [challenge, setChallenge] = useState<Challenge | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!params?.id) return

        fetch(`/api/challenge/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setChallenge(data)
                setLoading(false)
            })
    }, [params?.id])

    if (loading) {
        return <div className="text-white p-6">Loading...</div>
    }

    if (!challenge) {
        return <div className="text-white p-6">Challenge tidak ditemukan.</div>
    }

    return (
        <div className="mt-10 bg-white/10 border border-white/20 rounded-lg p-6 max-w-2xl mx-auto text-white">
            <h1 className="text-2xl font-bold mb-1">{challenge.title}</h1>
            <p className="text-sm text-gray-300 mb-4">
                by @{challenge.username} • {new Date(challenge.createdAt).toLocaleDateString()}
            </p>

            <p className="text-base leading-relaxed whitespace-pre-line">
                {challenge.description}
            </p>

            <div className="mt-6 flex gap-2 flex-wrap">
                <button
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded"
                    onClick={() =>
                        toast.info('Fitur "Ikuti Tantangan" belum diimplementasikan.')
                    }
                >
                    Follow Challenge
                </button>

                {session?.user?.id === challenge.userId && (
                    <div className="flex gap-2 flex-wrap">
                        <button
                            className="bg-transparent cursor-pointer border border-white text-white px-4 py-2 rounded"
                            onClick={() => router.push(`/challenge/edit/${challenge.id}`)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded"
                            onClick={async () => {
                                const confirmed = window.confirm('Yakin ingin menghapus tantangan ini?')
                                if (!confirmed) return

                                const res = await fetch(`/api/challenge/${challenge.id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                })

                                if (res.ok) {
                                    toast.success('Delete success!')
                                    router.push('/challenge')
                                } else {
                                    toast.error('Failed delete challenge.')
                                }
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}

                <button
                    className="bg-pink-600 hover:bg-pink-700 cursor-pointer text-white px-4 py-2 rounded"
                    onClick={() =>
                        toast.success('Link has been copy.', {
                            duration: 3000,
                        })
                    }
                >
                    Share to Instagram
                </button>
            </div>
        </div>
    )
}
