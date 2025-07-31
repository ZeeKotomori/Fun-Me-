'use client'

import { useEffect, useState } from 'react'

interface ModalFormUserProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (user: { name: string; email: string; role: 'A' | 'U'; password?: string }) => void
    initialData?: { name: string; email: string; role: 'A' | 'U' }
}

export function ModalFormUser({ isOpen, onClose, onSubmit, initialData }: ModalFormUserProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<'A' | 'U'>('U')

    useEffect(() => {
        if (initialData) {
            setName(initialData.name)
            setEmail(initialData.email)
            setRole(initialData.role)
            setPassword('') // Kosongkan jika sebelumnya diisi
        } else {
            setName('')
            setEmail('')
            setPassword('')
            setRole('U')
        }
    }, [initialData, isOpen])

    if (!isOpen) return null

    const handleSubmit = () => {
        const payload = {
            name,
            email,
            role,
            ...(initialData ? {} : { password }) // hanya kirim password saat create
        }
        onSubmit(payload)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded shadow w-96">
                <h2 className="text-lg font-semibold mb-4">
                    {initialData ? 'Update User' : 'Tambah User'}
                </h2>

                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Nama"
                        className="w-full border p-2 rounded text-white"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-2 rounded text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!!initialData}
                    />

                    {/* Tampilkan password hanya saat create */}
                    {!initialData && (
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-2 rounded text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    )}

                    <select
                        className="w-full border p-2 rounded text-white"
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'A' | 'U')}
                    >
                        <option value="U">User</option>
                        <option value="A">Admin</option>
                    </select>

                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
