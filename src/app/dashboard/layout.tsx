import { Navbar } from '@/components/navbar';
import Header from '@/components/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid md:grid-cols-5'>
      <Navbar className='hidden md:block' />
      <div className='col-span-3 md:col-span-4 md:border-l'>
        <Header />
        {children}
      </div>
    </div>
  );
}
