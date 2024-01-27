import { Navbar } from '@/components/navbar';
import Header from '@/components/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex'>
      <Navbar className='hidden lg:block' />
      <div className='flex relative flex-col flex-1 border-l overflow-x-auto'>
        <Header />
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  );
}
