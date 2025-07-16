import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
    return (
        <main className="flex-grow flex flex-col bg-[#0a0a0a] items-center justify-center px-4 font-[family-name:var(--font-geist-sans)]">
            {children}
        </main>
    );
}
