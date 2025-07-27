// components/Sidebar.tsx
import Link from 'next/link'

export function Sidebar() {
    return (
        <aside className="hidden md:block w-64 bg-gray-800 shadow h-screen fixed left-0 top-0 p-4">
            <div className="text-xl font-bold mb-6">MyDashboard</div>
            <nav className="flex flex-col space-y-4">
                <Link href="/" className="hover:text-blue-500">Home</Link>
                <Link href="/dashboard" className="hover:text-blue-500">Dashboard</Link>
            </nav>
        </aside>
    );
}