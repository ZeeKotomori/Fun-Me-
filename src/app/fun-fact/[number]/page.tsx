import PageWrapper from '../../components/PageWrapper';
import Navbar from '@/app/components/Navbar';

interface Props {
    params: { number: string };
}

export default async function NumberFactPage({ params }: Props) {
    const number = params.number;

    // Validasi: Pastikan input hanya angka
    if (isNaN(Number(number))) {
        return (
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <PageWrapper>
                    <h1 className="text-xl font-bold">Ups!</h1>
                    <p className="mt-4 text-red-500">Input harus berupa angka.</p>
                </PageWrapper>
            </div>
        );
    }

    const res = await fetch(`http://numbersapi.com/${number}`);
    const text = await res.text();

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <PageWrapper>
                <h1 className="text-xl font-bold">Angka {number}</h1>
                <p className="text-base text-center max-w-xl mt-4">{text}</p>
            </PageWrapper>
        </div>
    );
}
