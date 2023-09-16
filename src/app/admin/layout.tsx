'use client';

import { useLoading } from '@/components/admin/is-loading';
import MenuHeader from '@/components/admin/menu-header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setIsLoading } = useLoading();

  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  return (
    <div className={''}>
      <MenuHeader />
      <div className={'container mx-auto px-4 py-2'}>
        {children}
      </div>
    </div>
  );
}
