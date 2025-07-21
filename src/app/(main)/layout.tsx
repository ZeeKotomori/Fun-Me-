'use client'

import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <SessionProvider>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <PageWrapper>
                        {children}
                    </PageWrapper>
                </div>
            </SessionProvider>
        </div>
    );
}