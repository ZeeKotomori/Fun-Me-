'use client'

import { useState } from 'react'
import { ModalFormUser } from '@/components/ModalFormUser'
import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useCreateUserMutation,
    useUpdateUserMutation,
} from '@/store/api'

type User = {
    id: string
    name: string
    email: string
    role: 'A' | 'U'
}

export default function DashboardUserPage() {
    const { data: users = [], refetch, isLoading } = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [createUser] = useCreateUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const handleDelete = async (id: string) => {
        const confirm = window.confirm('Yakin ingin menghapus user ini?')
        if (confirm) {
            await deleteUser(id)
            refetch()
        }
    }

    const handleCreateOrUpdate = async (user: { name: string; email: string; role: 'A' | 'U' }) => {
        try {
            if (selectedUser) {
                // update
                await updateUser({ id: selectedUser.id, data: user }).unwrap()
            } else {
                // create
                await createUser(user).unwrap()
            }

            setIsModalOpen(false)
            setSelectedUser(null)
            refetch()
        } catch (error) {
            console.error("Gagal menyimpan user:", error)
            alert("Terjadi kesalahan saat menyimpan data user.")
        }
    }

    const openCreateModal = () => {
        setSelectedUser(null)
        setIsModalOpen(true)
    }

    const openEditModal = (user: User) => {
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    return (
        <div>
            <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-semibold">Manajemen Pengguna</h1>
            <button
                onClick={openCreateModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                + Tambah User
            </button>
            </div>

            <div className="overflow-x-auto bg-gray-800 rounded shadow">
            <table className="min-w-full">
                <thead className="bg-gray-900 text-left">
                <tr>
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2">Nama</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Aksi</th>
                </tr>
                </thead>
                <tbody>
                {isLoading ? (
                    <tr>
                    <td colSpan={5} className="text-center p-4">Memuat data...</td>
                    </tr>
                ) : users.length > 0 ? (
                    users.map((user, index) => (
                    <tr key={user.id} className="border-t">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">
                        {user.role === 'A' ? 'Admin' : 'User'}
                        </td>
                        <td className="px-4 py-2 space-x-2">
                        <button
                            onClick={() => openEditModal(user)}
                            className="text-yellow-400 hover:underline"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-500 hover:underline"
                        >
                            Hapus
                        </button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={5} className="text-center p-4 text-gray-500">
                        Tidak ada pengguna
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>

            <ModalFormUser
            isOpen={isModalOpen}
            onClose={() => {
                setIsModalOpen(false)
                setSelectedUser(null)
            }}
            onSubmit={handleCreateOrUpdate}
            initialData={
                selectedUser
                ? {
                    name: selectedUser.name,
                    email: selectedUser.email,
                    role: selectedUser.role,
                }
                : undefined
            }
            />
        </div>
    )
}
