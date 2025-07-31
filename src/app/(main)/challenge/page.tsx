'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { LoginPromptModal } from '@/components/LoginPromptModal'
import { toast } from 'sonner'

interface Challenge {
    id: string
    title: string
    description: string
    username: string
    userId: string
    createdAt: string
}

export default function ChallengePage() {
    const { data: session } = useSession()
    const [showModal, setShowModal] = useState(false)
    const [challenges, setChallenges] = useState<Challenge[]>([])

    useEffect(() => {
        fetch('/api/challenge')
            .then((res) => res.json())
            .then(setChallenges)
    }, [])

    return (
        <div className="flex flex-col min-h-screen text-white p-6">
            <div className="flex justify-between items-center mb-6">
                <Link
                    href="/challenge/new"
                    className="bg-white text-black px-3 py-1 rounded hover:bg-gray-300 transition"
                >
                    ➕ Buat Challenge
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {challenges.map((challenge) => (
                    <div
                        key={challenge.id}
                        className="bg-white/10 hover:bg-white/20 transition-all border border-white/20 p-4 rounded-lg flex flex-col justify-between"
                    >
                        <Link href={`/challenge/${challenge.id}`} className="block">
                            <h3 className="text-md font-bold mb-1">{challenge.title}</h3>
                            <p className="text-xs text-gray-300 mb-2">
                                by @{challenge.username} • {new Date(challenge.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm italic line-clamp-3 mb-4">&quot;{challenge.description}&quot;</p>
                        </Link>

                        <div className="flex justify-between items-center text-sm gap-2">
                            <button
                                onClick={() => {
                                    if (!session) {
                                        setShowModal(true)
                                    } else {
                                        toast.info('Coming Soon: Follow Challenge feature!')
                                    }
                                }}
                                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-xs px-3 py-1 rounded transition"
                            >
                                Follow Challenge
                            </button>

                            {session?.user.id === challenge.userId && (
                                <>
                                    <button
                                        onClick={async () => {
                                            const confirm = window.confirm('Sure wanna delete this challenge?')
                                            if (!confirm) return
                                            const response = await fetch(`/api/challenge/${challenge.id}`, {
                                                method: 'DELETE',
                                            })

                                            if (response.status === 403) {
                                                alert("You don't have an access to delete this challenge.")
                                                return
                                            }

                                            toast.success('Challenge deleted successfully!')
                                            setChallenges((prev) => prev.filter((c) => c.id !== challenge.id))
                                        }}
                                        className="bg-red-600 cursor-pointer hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition"
                                    >
                                        Delete
                                    </button>

                                    <Link
                                        href={`/challenge/edit/${challenge.id}`}
                                        className="border border-gray-400 text-white text-xs px-3 py-1 rounded hover:bg-white/10 transition"
                                    >
                                        Edit
                                    </Link>
                                </>
                            )}

                            <button
                                onClick={() => {
                                    const link = `${window.location.origin}/challenge/${challenge.id}`
                                    navigator.clipboard.writeText(link)

                                    toast.success('Link has been copy to clipboard', {
                                        description: 'Share link to ur instagram!',
                                    })
                                }}
                                className="bg-pink-600 hover:bg-pink-700 text-white cursor-pointer text-xs px-3 py-1 rounded transition"
                            >
                                Share to Instagram
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && <LoginPromptModal onClose={() => setShowModal(false)} />}
        </div>
    )
}
