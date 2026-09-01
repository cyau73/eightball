import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sassy Magic 8-Ball API',
  description: 'Serverless API & PostgreSQL Database for Sassy Magic 8-Ball Mobile App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
