'use client';
import Link from 'next/link';
import Navbar from './components/Navbar';
import PageWrapper from './components/PageWrapper';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageWrapper>
        <ol className="text-white list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            <span className="font-semibold">Fun Me!</span> Discover fun facts & leave sweet notes.
          </li>

          <li className="mb-2 tracking-[-.01em]">
            New day, new facts — with music and memories 🎵💬
          </li>

          <div className="flex pt-2 items-center flex-col sm:flex-row gap-4">
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-gray-50 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href='/fun-fact/today'
            >
              <span className='font-bold'>See Fact !</span>
            </Link>
            <Link
              className="rounded-full border border-solid hover:bg-gray-900 text-white border-white bg-black transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href='/notes/'
            >
              <span className='font-bold'>Leave Note!</span>
            </Link>
          </div>
        </ol>
      </PageWrapper>
    </div>
  );
}
