import { Navbar } from '@/components/Navbar';
import { PageContainer } from '@/components/PageContainer';

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <PageContainer>
        {children}
      </PageContainer>
    </>
  );
}
