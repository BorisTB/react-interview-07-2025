import Layout from '@/components/Layout/Layout';
import type { Metadata } from 'next';
import StoreProvider from '@/lib/store/Store.provider';

export const metadata: Metadata = {
  title: 'SiteOne interview app',
  description: 'Simple interview app for SiteOne'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Layout>
          <StoreProvider>{children}</StoreProvider>
        </Layout>
      </body>
    </html>
  );
}
