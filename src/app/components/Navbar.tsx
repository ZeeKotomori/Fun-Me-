'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);

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
        }, 500); // delay 1 detik
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
                    {/* Fun dropdown */}
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

                    {/* Other nav items */}
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

            {/* Mobile */}
            {isOpen && (
                <div className="mt-4 flex flex-col gap-4 md:hidden">
                    {funItems.map((item) => (
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
