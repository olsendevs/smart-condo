'use client';

import React from 'react';
import { DataTable } from './components/data-table';
import { User } from '@/types/user';
import { columns } from './components/columns';
import 'dotenv/config';
import { LoadingSpinner } from '@/components/admin/loading-spinner';
import { CreateUserForm } from './components/create-user-form';
import { EditUserForm } from './components/edit-user-form';
import { create } from 'domain';

export default function User() {
  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [updateData, setUpdateData] = React.useState(
    new Date(),
  );

  const [editFormData, setEditFormData] = React.useState({
    name: '',
    email: '',
    type: '',
  });

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

        setTableData(responseData);
      } catch (error) {
        console.error('Error:', error);
        setTableData([]);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }

    fetchData();
  }, [updateData]);

  return (
    <main className="pt-20 pl-5">
      <h1 className="pb-2">Usuários</h1>
      <DataTable
        columns={columns({
          editFormData,
          setEditFormData,
          tableData,
          setTableData,
        })}
        data={tableData}
      />
      <CreateUserForm
        tableData={tableData}
        setTableData={setTableData}
      />
      <div>
        <EditUserForm
          formData={editFormData}
          setFormData={setEditFormData}
          setUpdateData={setUpdateData}
        />
      </div>
      <LoadingSpinner visible={isLoading} />
    </main>
  );
}
