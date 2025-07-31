interface ChallengeCardProps {
    title: string;
    description: string;
    username: string;
    createdAt: string;
}

export default function ChallengeCard({
    title,
    description,
    username,
    createdAt,
}: ChallengeCardProps) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>by {username}</span>
                <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex gap-2">
                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
                        Ikuti Tantangan
                    </button>

                    <button className="px-4 py-2 rounded-xl border border-gray-400 text-gray-700 hover:bg-gray-100 transition flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.75A3.25 3.25 0 0 1 21 7.25v11.5A3.25 3.25 0 0 1 17.75 22H6.25A3.25 3.25 0 0 1 3 18.75V7.25A3.25 3.25 0 0 1 6.25 4H7V2.75A.75.75 0 0 1 7.75 2Zm0 3.5H6.25A1.75 1.75 0 0 0 4.5 7.25v11.5c0 .966.784 1.75 1.75 1.75h11.5c.966 0 1.75-.784 1.75-1.75V7.25a1.75 1.75 0 0 0-1.75-1.75H16.5v1.25a.75.75 0 0 1-1.5 0V5.5h-7v1.25a.75.75 0 0 1-1.5 0V5.5Z" />
                        </svg>
                        Bagikan ke IG
                    </button>
                </div>
            </div>
        </div>
    );
}
