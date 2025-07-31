'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const res = await fetch('api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })

        const data = await res.json()

        if (!res.ok) {
            toast.error(data.message || 'Registration failed!')
            setIsLoading(false)
        } else {
            toast.success('Registration successful! Please login.')
            setIsLoading(false)
            router.push('/login')
        }
    }

    return (
        <div className="flex min-h-screen">
            <div className="w-full md:w-1/2 bg-[#0B0E1E] flex flex-col justify-center px-10">
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-2">Register</h2>
                    <p className="text-sm text-gray-400 mb-6">Create an account to start learning!</p>
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div>
                            <label className="text-white text-sm mb-1 block">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-white text-sm mb-1 block">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="doctorJhon@gmail.com"
                                className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-white text-sm mb-1 block">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                                >
                                    👁️
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded flex justify-center items-center"
                        >
                            {isLoading ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M12 2a10 10 0 0110 10h-4a6 6 0 00-6-6V2z"
                                    />
                                </svg>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </form>
                    <button
                        type="button"
                        onClick={() => signIn('google', { callbackUrl: '/login' })}
                        className="w-full border border-white bg-gray-500 hover:bg-white text-white hover:text-gray-500 py-2 rounded mt-2 flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
                            <path fill="#4285F4" d="M533.5 278.4c0-17.8-1.6-35-4.7-51.7H272v97.8h146.9c-6.4 34.6-25.7 63.9-54.7 83.5v69h88.4c51.7-47.6 81.4-117.8 81.4-198.6z" />
                            <path fill="#34A853" d="M272 544.3c73.8 0 135.7-24.5 180.9-66.5l-88.4-69c-24.5 16.4-55.6 26.2-92.5 26.2-71 0-131.1-47.9-152.6-112.1h-90.2v70.6C84.3 486.7 171.9 544.3 272 544.3z" />
                            <path fill="#FBBC05" d="M119.4 322.9c-10.6-31.5-10.6-65.7 0-97.2v-70.6H29.2c-37.9 74.9-37.9 163 0 237.8l90.2-70z" />
                            <path fill="#EA4335" d="M272 107.5c39.8 0 75.6 13.7 103.8 40.6l77.7-77.7C407.7 24.5 345.8 0 272 0 171.9 0 84.3 57.6 29.2 154.5l90.2 70c21.5-64.2 81.6-112 152.6-112z" />
                        </svg>
                        Register with Google
                    </button>
                    <div className="text-center text-sm text-gray-400 mt-4">
                        Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex w-1/2 bg-[#10122C] items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Fun Me</h1>
                    <p className="text-sm text-gray-400 mt-2">Let&apos;s leave ur notes and give a challange</p>
                </div>
            </div>
        </div>
    )
}