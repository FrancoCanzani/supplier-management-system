import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='py-10 mb-8 lg:py-4 px-4 h-16 flex items-center lg:justify-end justify-between border-b'>
      <nav className='flex items-center justify-start lg:hidden gap-x-2'>
        <Link
          href={'/dashboard'}
          className='inline-flex text-xl italic items-center rounded-md font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-10 px-4 py-2 justify-start'
        >
          Supplify
        </Link>
        <Link
          href={'/dashboard'}
          className='inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-10 px-4 py-2 w-full justify-start'
        >
          Tasks
        </Link>
        <Link
          href={'/dashboard/suppliers'}
          className='inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-10 px-4 py-2 w-full justify-start'
        >
          Suppliers
        </Link>
      </nav>
      <UserButton afterSignOutUrl='/' />
    </header>
  );
}
