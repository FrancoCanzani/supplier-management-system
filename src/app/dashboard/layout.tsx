import { Navbar } from '@/components/navbar';
import Header from '@/components/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex relative min-h-screen'>
      <Navbar className='hidden lg:block' />
      <div className='md:border-l flex-1'>
        <Header />
        {children}
      </div>
    </div>
  );
}
