'use client';

import React from 'react';
import { DataTable } from './components/data-table';
import { Project } from '@/types/project';
import { columns } from './components/columns';
import 'dotenv/config';
import { LoadingSpinner } from '@/components/admin/loading-spinner';
import { CreateProjectForm } from './components/create-form';
import { EditProjectForm } from './components/edit-form';
import { SendExpensesForm } from './components/expenses-form';

export default function Project() {
  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [updateData, setUpdateData] = React.useState(
    new Date(),
  );

  const [editFormData, setEditFormData] = React.useState({
    name: '',
    budget: '',
    startDate: '',
    endDate: '',
    assemblyApproval: '',
  });

  const [sendExpensesData, setSendExpensesData] =
    React.useState({
      id: '',
      cost: '',
      sendDate: '',
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
          `${process.env.NEXT_PUBLIC_API_URL}/project/condominium/${condominiumId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const responseData = await response.json();
        const result = responseData.map((e: any) => {
          e.assemblyApproval
            ? (e.assemblyApprovalLabel = 'Aprovado')
            : (e.assemblyApprovalLabel = 'Não Aprovado');

          e.startDate = e.startDate.split('T')[0];
          return e;
        });

        console.log(result);
        setTableData(result);
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
      <h1 className="pb-2">Projeto</h1>
      <DataTable
        columns={columns({
          editFormData,
          setEditFormData,
          sendExpensesData,
          setSendExpensesData,
          tableData,
          setTableData,
        })}
        data={tableData}
      />
      <CreateProjectForm
        tableData={tableData}
        setTableData={setTableData}
      />
      <div>
        <EditProjectForm
          formData={editFormData}
          setFormData={setEditFormData}
          setUpdateData={setUpdateData}
        />
        <SendExpensesForm
          formData={sendExpensesData}
          setFormData={setSendExpensesData}
          setUpdateData={setUpdateData}
        />
      </div>
      <LoadingSpinner visible={isLoading} />
    </main>
  );
}
