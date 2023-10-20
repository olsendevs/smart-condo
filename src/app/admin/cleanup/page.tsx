'use client';

import React from 'react';
import { DataTable } from './components/data-table';
import { CleanUp } from '@/types/cleanup';
import { columns } from './components/columns';
import 'dotenv/config';
import { LoadingSpinner } from '@/components/admin/loading-spinner';
import { CreateCleanUpForm } from './components/create-form';
import { EditCleanUpForm } from './components/edit-form';
import { Tag } from '@/components/ui/tag-input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function CleanUp() {
  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [updateData, setUpdateData] = React.useState(
    new Date(),
  );

  const [editFormData, setEditFormData] = React.useState({
    name: '',
    ambientId: '',
    tasks: [{ name: '', done: false }],
    id: '',
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
          `${process.env.NEXT_PUBLIC_API_URL}/cleanup/condominium/${condominiumId}`,
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
      <h1 className="pb-2">Limpezas</h1>
      <Dialog>
        <DialogTrigger
          id="open-tasks-modal"
          className="hidden"
        >
          Open
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lista de tarefas</DialogTitle>
            <DialogDescription>
              Seguem todas as tarefas que foram concluidas
              nessa limpeza.
            </DialogDescription>
            <div>
              {editFormData.tasks.map((e) => {
                return (
                  <div
                    key={e.name}
                    className="flex row items-center mt-9"
                  >
                    <Checkbox checked={e.done} />
                    <Label className="ml-4">{e.name}</Label>
                  </div>
                );
              })}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <DataTable
        columns={columns({
          editFormData,
          setEditFormData,
          tableData,
          setTableData,
        })}
        data={tableData}
      />
      <CreateCleanUpForm
        tableData={tableData}
        setTableData={setTableData}
      />
      <div>
        <EditCleanUpForm
          formData={editFormData}
          setFormData={setEditFormData}
          setUpdateData={setUpdateData}
        />
      </div>
      <LoadingSpinner visible={isLoading} />
    </main>
  );
}
