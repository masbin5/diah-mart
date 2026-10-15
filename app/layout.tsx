import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DIAH MART | Frozen Food, Sembako & Kebutuhan Rumah',
  description: 'Belanja frozen food, sembako, kebutuhan dapur, dan perlengkapan rumah tangga sehari-hari di DIAH MART. Praktis, dekat, dan mudah.',
  icons: { icon: '/Diahmartt.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}