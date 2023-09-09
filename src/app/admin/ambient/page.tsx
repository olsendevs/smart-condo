'use client';

import React from 'react';
import { DataTable } from './components/data-table';
import { Ambient } from '@/types/ambient';
import { columns } from './components/columns';
import 'dotenv/config';
import { LoadingSpinner } from '@/components/admin/loading-spinner';
import { CreateAmbientForm } from './components/create-form';
import { EditAmbientForm } from './components/edit-form';

export default function Ambient() {
  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [updateData, setUpdateData] = React.useState(
    new Date(),
  );

  const [editFormData, setEditFormData] = React.useState({
    name: '',
    description: '',
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        const token = JSON.parse(
          localStorage.getItem('user') || '',
        ).accessToken;

        const condominiumId = JSON.parse(
          localStorage.getItem('condominium') || '',
        )._id;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/ambient/condominium/${condominiumId}`,
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
      <h1 className="pb-2">Ambientes</h1>
      <DataTable
        columns={columns({
          editFormData,
          setEditFormData,
          tableData,
          setTableData,
        })}
        data={tableData}
      />
      <CreateAmbientForm
        tableData={tableData}
        setTableData={setTableData}
      />
      <div>
        <EditAmbientForm
          formData={editFormData}
          setFormData={setEditFormData}
          setUpdateData={setUpdateData}
        />
      </div>
      <LoadingSpinner visible={isLoading} />
    </main>
  );
}
