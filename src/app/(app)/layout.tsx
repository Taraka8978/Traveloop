import Navbar from '@/components/Navbar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {children}
      </div>
    </>
  );
}
