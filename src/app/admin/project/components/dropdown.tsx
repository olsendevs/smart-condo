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
import { Toaster } from '@/components/ui/toaster';
import { Project } from '@/types/project';

export function Dropdown({
  project,
  setEditFormData,
  setSendExpensesData,
  tableData,
  setTableData,
}: any) {
  const { setIsLoading } = useLoading();
  async function deleteProject(id: any) {
    setIsLoading(true);
    setEditFormData({
      name: '',
      budget: '',
      startDate: '',
      endDate: '',
    });

    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${id}`,
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
            'Erro ao deletar projeto. Tente novamente.',
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
        title: 'Projeto deletado com sucesso!',
        variant: 'destructive',
      });
      setIsLoading(false);
    }, 300);
    return;
  }

  function editProject(project: any) {
    setEditFormData(() => ({
      name: project.name,
      budget: project.budget,
      startDate: project.startDate,
      endDate: project.endDate,
      assemblyApproval: project.assemblyApproval,
      id: project._id,
    }));

    document.getElementById('open-edit-form')?.click();

    return;
  }

  const handleSendExpenses = (project: any) => {
    setSendExpensesData(() => ({
      id: project._id,
      sendDate: '',
      cost: '',
    }));

    document.getElementById('open-expenses-form')?.click();

    return;
  };

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
            Ações no projeto
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => handleSendExpenses(project)}
          >
            Lançar despesa
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => editProject(project)}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => deleteProject(project._id)}
          >
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
