import Navbar from '@/app/components/Navbar';
import PageWrapper from '../../components/PageWrapper';
import RandomFact from '@/app/components/RandomFact';

export default async function FunFactToday() {
    return (
        <div className='flex flex-col bg-[#0a0a0a] min-h-screen'>
        <Navbar />
        <PageWrapper>
            <RandomFact />
        </PageWrapper>
        </div>
    );
}
