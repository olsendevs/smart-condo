'use client';

import React from 'react';
import { DataTable } from './components/data-table';
import { Condominium } from '@/types/condominium';
import { columns } from './components/columns';
import 'dotenv/config';
import { LoadingSpinner } from '@/components/admin/loading-spinner';
import { CreateCondominiumForm } from './components/create-form';
import { EditCondominiumForm } from './components/edit-form';

export default function Condominium() {
  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [updateData, setUpdateData] = React.useState(
    new Date(),
  );

  const [editFormData, setEditFormData] = React.useState({
    name: '',
    address: '',
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        const token = JSON.parse(
          localStorage.getItem('user') || '',
        ).accessToken;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/condominium/`,
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
      <h1 className="pb-2">Condominio</h1>
      <DataTable
        columns={columns({
          editFormData,
          setEditFormData,
          tableData,
          setTableData,
        })}
        data={tableData}
      />
      <CreateCondominiumForm
        tableData={tableData}
        setTableData={setTableData}
      />
      <div>
        <EditCondominiumForm
          formData={editFormData}
          setFormData={setEditFormData}
          setUpdateData={setUpdateData}
        />
      </div>
      <LoadingSpinner visible={isLoading} />
    </main>
  );
}
