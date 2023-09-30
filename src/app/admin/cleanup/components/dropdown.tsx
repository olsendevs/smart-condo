'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useLoading } from '@/components/admin/is-loading';
import { toast } from '@/components/ui/use-toast';

import { useState } from 'react';

import Swal from 'sweetalert2';
export function Dropdown({
  cleanUp,
  setEditFormData,
  tableData,
  setTableData,
}: any) {
  const { setIsLoading } = useLoading();
  async function deleteCleanUp(id: any) {
    setIsLoading(true);
    setEditFormData({
      name: '',
      ambientId: '',
      tasks: [],
    });

    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cleanUp/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (
        response.status === 500 ||
        response.status === 400
      ) {
        toast({
          title:
            'Erro ao deletar Limpeza. Tente novamente.',
          variant: 'destructive',
        });
        return;
      }

      const tableDataWithoutDeleted = tableData.filter(
        (x: any) => x._id != id,
      );

      setTableData(tableDataWithoutDeleted);
    } catch (error) {
      console.error('Error:', error);
    }
    setTimeout(() => {
      toast({
        title: 'Limpeza deletada com sucesso!',
        variant: 'destructive',
      });
      setIsLoading(false);
    }, 300);
    return;
  }

  function editCleanUp(cleanUp: any) {
    console.log(cleanUp);
    setEditFormData(() => ({
      name: cleanUp.name,
      ambientId: cleanUp.ambientId._id,
      tasks: cleanUp.tasks,
      id: cleanUp._id,
    }));

    document.getElementById('open-edit-form')?.click();

    return;
  }

  const openTasksDialog = () => {};
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Ações na limpeza
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => console.log(cleanUp)}
          >
            Enviar evidência da limpeza
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => openTasksDialog()}
          >
            Verificar lista de tarefas
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => editCleanUp(cleanUp)}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => deleteCleanUp(cleanUp._id)}
          >
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
