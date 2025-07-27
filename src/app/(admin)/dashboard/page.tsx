// app/dashboard/page.tsx
'use client'

import { Card } from '@/components/Card'
import { useGetDashboardDataQuery } from '@/store/api'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter()

    const { data, error, isLoading } = useGetDashboardDataQuery(undefined, {
        pollingInterval: 5000,
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } 
        
        if (status === 'authenticated' && session?.user.role !== 'A') {
            router.push('/unauthorized')
        }
    },  [status, session, router])

    if (isLoading) { <div>Loading...</div> }
    if (error) { return <div>Failed to load Data</div>; }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card title="Total Users" value={data?.users.toLocaleString() ?? '-'} />
                <Card title="Note's Leave Today" value={data?.notesToday.toLocaleString() ?? '-'} />
                <Card title="Leave Challange" value={data?.leavesChallenge.toLocaleString() ?? '-'} />
            </div>
        </div>
    )
}
