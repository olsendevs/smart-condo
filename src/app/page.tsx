'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/home');
  }, []);

  return <></>;
}
