// app/layout.tsx
import '../globals.css'
import ClientLayout from '@/components/ClientLayout';
import { ReduxProvider } from '@/lib/redux/provider';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ReduxProvider>
            <ClientLayout>{children}</ClientLayout>
        </ReduxProvider>
    );
}
