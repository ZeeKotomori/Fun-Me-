// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image'

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);
    const { data: session, status } = useSession();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const funItems = [
        { label: 'Fun-Day', href: '/fun-fact/today' },
        { label: 'Fun-Num', href: '/fun-fact/number' },
        { label: 'Leave Note', href: '/notes/new' },
        { label: 'Challenge Me', href: '/challenge' },
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

                    {session?.user?.role === 'A' && (
                        
                        <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className={clsx(
                                'relative pb-1 transition-all',
                                pathname === '/dashboard'
                                    ? 'text-white border-b-2 border-white font-semibold'
                                    : 'text-gray-400 hover:text-white'
                            )}
                        >
                            Dashboard
                        </Link>
                    )}

                    {/* Auth */}
                    <div className="ml-4">
                        {status === 'authenticated' ? (
                            <div className="flex items-center gap-2">
                                {session.user?.image && (
                                    <Image
                                        src={session.user.image}
                                        alt="Profile"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                )}

                                <button
                                    onClick={() => signOut()}
                                    className="text-sm text-red-400 hover:text-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="text-xl font-bold">
                                <button
                                    className="text-sm bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                                >
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="mt-4 flex flex-col gap-3 md:hidden bg-[#0a0a0a] px-4 py-4 rounded shadow-md">
                    <span className="text-gray-500 uppercase text-xs tracking-wide">Fun</span>
                    {funItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={clsx(
                                'block px-2 py-2 rounded hover:bg-white/10',
                                pathname === item.href ? 'text-white font-semibold' : 'text-gray-300'
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <span className="text-gray-500 uppercase text-xs tracking-wide mt-4">Main</span>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={clsx(
                                'block px-2 py-2 rounded hover:bg-white/10',
                                pathname === item.href ? 'text-white font-semibold' : 'text-gray-300'
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {session?.user?.role === 'A' && (
                        <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className={clsx(
                                'block px-2 py-2 rounded hover:bg-white/10',
                                pathname === '/dashboard' ? 'text-white font-semibold' : 'text-gray-300'
                            )}
                        >
                            Dashboard
                        </Link>
                    )}

                    <div className="pt-4 border-t border-gray-700 mt-4">
                        {status === 'authenticated' ? (
                            <div className="flex items-center gap-3 flex-wrap">
                                {session.user?.image && (
                                    <Image
                                        src={session.user.image}
                                        alt="Profile"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                )}
                                <span className="text-sm">{session.user?.name}</span>
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm text-red-400 hover:text-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="block mt-2">
                                <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-left">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            )}

        </nav>
    );
}
