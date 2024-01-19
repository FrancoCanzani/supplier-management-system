import { UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className='pt-4 px-4 h-16 flex items-center justify-end'>
      <UserButton afterSignOutUrl='/' />
    </header>
  );
}
