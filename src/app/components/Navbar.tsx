'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // install lucide-react untuk ikon

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Fun-Day', href: '/fun-fact/today' },
        { label: 'Fun-Num', href: '/fun-fact/number' },
        { label: 'About', href: '/about' },
        { label: 'Profile', href: '/profile' },
    ];

    return (
        <nav className="w-full px-6 py-4 shadow-md text-white font-[var(--font-geist-sans)]">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold">
                    Fun Me!
                </Link>

                {/* Hamburger Icon for mobile */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden focus:outline-none"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Menu Items (desktop) */}
                <div className="hidden md:flex items-center gap-6">
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
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="mt-4 flex flex-col gap-4 md:hidden">
                    {navItems.map((item) => (
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
                </div>
            )}
        </nav>
    );
}
