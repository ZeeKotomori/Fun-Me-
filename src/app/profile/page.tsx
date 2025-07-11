import Navbar from '../components/Navbar';
import PageWrapper from '../components/PageWrapper';

export default function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <PageWrapper>
                <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2 tracking-[-.01em]">
                        Hai I am {' '}
                        <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                            neon zee / Zikri
                        </code>
                    </li>
                    <li className='mb-2 tracking-[-.01em]'>
                        From {' '}
                        <a 
                            href="https://maps.app.goo.gl/EVx6gfRDg36Qsrmy7"
                            target='_blank'
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:underline"
                            >
                            Bandung 
                        </a>
                    </li>
                    <li className="tracking-[-.01em]">
                        My GitHub is {' '}
                        <a
                            href="https://github.com/ZeeKotomori"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline">
                            ZeeKotomori (At GitHub)
                        </a>
                    </li>
                </ol>
            </PageWrapper>
        </div>
    );
}
