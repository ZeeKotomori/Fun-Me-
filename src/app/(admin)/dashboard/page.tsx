'use client'

import { Card } from '@/components/Card'
import { useGetDashboardDataQuery } from '@/store/api'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { data, error, isLoading } = useGetDashboardDataQuery(undefined, {
        pollingInterval: 5000,
    })

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login')
        if (status === 'authenticated' && session?.user.role !== 'A') router.push('/unauthorized')
    }, [status, session, router])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Gagal memuat data</div>

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card title="Total Users" value={data?.users.toLocaleString() ?? '-'} />
                <Card title="Note's Leave Today" value={data?.notesToday.toLocaleString() ?? '-'} />
                <Card title="Leave Challange" value={data?.leavesChallenge.toLocaleString() ?? '-'} />
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold">Manajemen Pengguna</h2>
                <p className="text-gray-600">Lihat dan kelola data pengguna di halaman <a href="/dashboard/users" className="text-blue-500 underline">Dashboard {'>'} Users</a></p>
            </div>
        </div>
    )
}
