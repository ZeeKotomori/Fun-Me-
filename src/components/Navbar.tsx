// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);
    const { data: session, status } = useSession();

    const funItems = [
        { label: 'Fun-Day', href: '/fun-fact/today' },
        { label: 'Fun-Num', href: '/fun-fact/number' },
        { label: 'Leave Note', href: '/notes/new' },
    ];

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Profile', href: '/profile' },
    ];

    const handleMouseEnter = () => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 500);
    };

    return (
        <nav className="w-full bg-[#0a0a0a] px-6 py-4 shadow-md text-white font-[var(--font-geist-sans)]">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Fun Me!
                </Link>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden focus:outline-none"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center gap-6">
                    <div
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className="cursor-pointer text-gray-400 hover:text-white transition-all font-medium">
                            Fun ▾
                        </span>
                        {isDropdownOpen && (
                            <div className="absolute z-10 flex flex-col bg-black border border-white/20 mt-2 rounded w-40 shadow-md">
                                {funItems.map((subItem) => (
                                    <Link
                                        key={subItem.href}
                                        href={subItem.href}
                                        className={clsx(
                                            'px-4 py-2 hover:bg-white/10',
                                            pathname === subItem.href
                                                ? 'text-white font-semibold'
                                                : 'text-gray-300'
                                        )}
                                    >
                                        {subItem.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                'relative pb-1 transition-all',
                                pathname === item.href
                                    ? 'text-white border-b-2 border-white font-semibold'
                                    : 'text-gray-400 hover:text-white'
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* Auth */}
                    <div className="ml-4">
                        {status === 'authenticated' ? (
                            <div className="flex items-center gap-2">
                                <img
                                    src={session.user?.image ?? ''}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm text-red-400 hover:text-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => signIn('google')}
                                className="text-sm bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="mt-4 flex flex-col gap-4 md:hidden">
                    {[...funItems, ...navItems].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={clsx(
                                'block border-b pb-1',
                                pathname === item.href
                                    ? 'text-white border-white font-semibold'
                                    : 'text-gray-400 hover:text-white'
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="pt-2 border-t border-gray-700">
                        {status === 'authenticated' ? (
                            <div className="flex items-center gap-3">
                                <img
                                    src={session.user?.image ?? ''}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span>{session.user?.name}</span>
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm text-red-400 hover:text-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => signIn('google')}
                                className="text-sm bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
