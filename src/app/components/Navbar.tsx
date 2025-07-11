'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx'; // optional, but helps for cleaner class logic

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Fun-Day', href: '/fun-fact/today' },
        { label: 'Fun-Num', href: '/fun-fact/number' },
        { label: 'About', href: '/about' },
        { label: 'Profile', href: '/profile' },
    ];

    return (
        <nav className="flex justify-between items-center px-8 py-4 shadow font-[var(--font-geist-sans)]">
            <div className="text-lg font-semibold">
                <Link href="/">Fun Me!</Link>
            </div>

            <div className="flex items-center gap-6">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                            'relative pb-1 transition-all',
                            pathname === item.href
                                ? 'text-white border-b-2 border-white font-semibold'
                                : 'text-gray-500 hover:text-white'
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
