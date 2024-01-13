import { Sidebar } from '@/components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid lg:grid-cols-5'>
      <Sidebar className='hidden lg:block' />
      <div className='col-span-3 lg:col-span-4 lg:border-l'>{children}</div>
    </div>
  );
}
