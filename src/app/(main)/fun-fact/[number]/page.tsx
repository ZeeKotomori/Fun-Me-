import { notFound } from 'next/navigation';

export default async function NumberFactPage(
    props: {
        params: Promise<{ number: string }>;
    }
) {
    const params = await props.params;
    const number = params.number;

    if (isNaN(Number(number))) {
        return (
            <>
                <h1 className="text-xl font-bold">Ups!</h1>
                <p className="mt-4 text-red-500">Input must be a number.</p>
            </>
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
            <>
                <h1 className="text-xl font-bold">Number {number}</h1>
                <p className="text-base text-center max-w-xl mt-4">{text}</p>
            </>
        );
    } catch (error) {
        console.error('Error fetching number fact:', error);
        notFound();
    }
}
