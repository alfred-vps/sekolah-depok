import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Riset SD Depok — Cari Sekolah Dasar di Depok',
  description: 'Temukan dan bandingkan sekolah dasar negeri dan swasta di Kota Depok. Filter berdasarkan lokasi, biaya, kurikulum, akreditasi, dan fasilitas.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
