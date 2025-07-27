'use client';

import { SessionProvider } from 'next-auth/react';
import { Sidebar } from '@/components/SideBar';
import Navbar from '@/components/Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Sidebar />
            <div className="md:ml-64 min-h-screen">
                <Navbar />
                <main className="p-6 min-h-screen">{children}</main>
            </div>
        </SessionProvider>
    );
}
