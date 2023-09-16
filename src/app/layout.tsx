'use client';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LoadingProvider } from '@/components/admin/is-loading';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <html lang="pt-BR">
        <body className={inter.className}>
          {' '}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </LoadingProvider>
  );
}
