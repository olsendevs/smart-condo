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
import { Condominium } from '@/types/condominium';

export function Dropdown({
  condominium,
  setEditFormData,
  tableData,
  setTableData,
}: any) {
  const { setIsLoading } = useLoading();
  async function deleteCondominium(id: any) {
    setIsLoading(true);
    setEditFormData({
      name: '',
      address: '',
      id: '',
    });

    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/condominium/${id}`,
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
            'Erro ao deletar condominio. Tente novamente.',
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
        title: 'Condominio deletado com sucesso!',
        variant: 'destructive',
      });
      setIsLoading(false);
    }, 300);
    return;
  }

  function editCondominium(condominium: any) {
    setEditFormData(() => ({
      name: condominium.name,
      address: condominium.address,
      id: condominium._id,
    }));

    document.getElementById('open-edit-form')?.click();

    return;
  }

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
            Ações no condominio
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => editCondominium(condominium)}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              deleteCondominium(condominium._id)
            }
          >
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
