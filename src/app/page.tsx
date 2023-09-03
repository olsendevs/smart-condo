'use client';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { useLogout } from '@/hooks/auth/useLogout';
import { access } from 'fs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/home');
  }, []);

  return <></>;
}
