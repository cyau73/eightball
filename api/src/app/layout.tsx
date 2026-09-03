import type { Metadata } from 'next';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import './globals.css';

export const metadata: Metadata = {
  title: 'Sassy Magic 8-Ball API',
  description: 'Serverless API & PostgreSQL Database for Sassy Magic 8-Ball Mobile App',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check session using stateless cookies
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If no session exists and we aren't already on the login page, the middleware/page will handle it.
  // Note: If this layout wraps /login as well, ensure you allow public routes, or keep layout restricted to dashboard.

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}