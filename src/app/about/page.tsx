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
                        <span className="font-semibold">Fun Me!</span> created as an assignment from the Jabar Digital Academy program.
                    </li>
                    <li className='tracking-[-.01em]'>
                        This app displays Fun facts of the day, <span className='font-semibold'>Every Day</span>. 
                    </li>
                    <li className='tracking-[-.01em]'>
                        You can see the facts of the day by clicking the button below or by visiting the <a href="/fun-fact/today" className="text-blue-500 hover:underline">Fun Fact Today</a> page.
                    </li>
                    <li className='tracking-[-.01em]'>
                        or you can type /fun-fact/today or fun-fact/[number] after domain
                    </li>
                    <li className='tracking-[-.01em]'>
                        Made using technology <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">Next.js 15</code>, <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">Tailwind CSS</code>, dan <code className='"bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold"'>React</code>.
                    </li>
                    <li className='tracking-[-.01em]'>
                        #new_day_new_facts
                    </li>
                </ol>
            </PageWrapper>
        </div>
    );
}
