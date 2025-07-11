import PageWrapper from '../../components/PageWrapper';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';

export default async function NumberFactPage({ params }: { params: { number: string } }) {
    const number = params.number;

    if (isNaN(Number(number))) {
        return (
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <PageWrapper>
                    <h1 className="text-xl font-bold">Ups!</h1>
                    <p className="mt-4 text-red-500">Input Must Be Number.</p>
                </PageWrapper>
            </div>
        );
    }

    try {
        const res = await fetch(`http://numbersapi.com/${number}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }

        const text = await res.text();

        return (
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <PageWrapper>
                    <h1 className="text-xl font-bold">Number {number}</h1>
                    <p className="text-base text-center max-w-xl mt-4">{text}</p>
                </PageWrapper>
            </div>
        );
    } catch (error) {
        console.error('Error fetching number fact:', error);
        notFound();
    }
}
