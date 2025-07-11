'use client';
import Navbar from './components/Navbar';
import PageWrapper from './components/PageWrapper';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageWrapper>
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            <span className="font-semibold">Fun Me!</span> is a simple app to view fun facts of the day every day.
          </li>

          <li className="mb-2 tracking-[-.01em]">
            Build With {" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              🧠
            </code>
          </li>

          <div className="flex pt-2 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href='/fun-fact/today'
            >
              <span className='font-bold'>See Fact Of The Day!</span>
            </a>
          </div>
        </ol>
      </PageWrapper>
    </div>
  );
}
