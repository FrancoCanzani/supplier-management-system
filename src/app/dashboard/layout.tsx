import { Navbar } from '@/components/navbar';
import Header from '@/components/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid lg:grid-cols-5'>
      <Navbar className='hidden lg:block' />
      <div className='col-span-3 lg:col-span-4 md:border-l'>
        <Header />
        {children}
      </div>
    </div>
  );
}
