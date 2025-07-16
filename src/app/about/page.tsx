import Navbar from '../components/Navbar';
import PageWrapper from '../components/PageWrapper';

export default function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <PageWrapper>
                <h1 className="text-2xl font-bold mb-2">About App</h1>
                <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <li className='tracking-[-.01em]'>
                        <span className="font-semibold">Fun Me!</span> is your daily source of quirky knowledge and meaningful moments.
                    </li>
                    <li className='tracking-[-.01em]'>
                        This app shows Fun facts of the day, <span className='font-semibold'>Every Day</span>.
                    </li>
                    <li className='tracking-[-.01em]'>
                        Not just facts <span className='font-semibold'>Now</span> you can write your own notes too!
                    </li>
                    <li className='tracking-[-.01em]'>
                        Send messages, lock them with a key 🔐, and even attach music 🎵
                    </li>
                    <li className='tracking-[-.01em]'>
                        Make them private, and share to your crush 💖
                    </li>

                    <li className='tracking-[-.01em]'>
                        #see_fact_and_leave_note
                    </li>
                </ol>
            </PageWrapper>
        </div>
    );
}
