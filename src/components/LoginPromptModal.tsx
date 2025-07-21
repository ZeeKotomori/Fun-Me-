"use client";

import { signIn } from "next-auth/react";

interface Props {
    onClose: () => void;
}

export function LoginPromptModal({ onClose }: Props) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-[#0a0a0a] rounded-lg p-6 max-w-md w-full shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Login Required</h2>
                <p className="mb-6">You need to login with Google to vote.</p>
                <div className="flex justify-end space-x-3">
                    <button
                        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => signIn("google")}
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
