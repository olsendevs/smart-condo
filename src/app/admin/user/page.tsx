'use client';

import React from 'react';
import { DataTable } from './components/data-table';
import { User } from '@/types/user';
import { columns } from './components/columns';
import 'dotenv/config';
import { LoadingSpinner } from '@/components/admin/loading-spinner';
import { set } from 'react-hook-form';

export default function User() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const token = JSON.parse(
          localStorage.getItem('user') || '',
        ).accessToken;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const responseData = await response.json();

        setData(responseData);
      } catch (error) {
        console.error('Error:', error);
        setData([]);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }

    fetchData();
  }, []);

  return (
    <main className="pt-20 pl-5">
      <h1 className="pb-2">Usuários</h1>
      <DataTable columns={columns} data={data} />
      <LoadingSpinner visible={isLoading} />
    </main>
  );
}
