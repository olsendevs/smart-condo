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
import { Maintenance } from '@/types/maintenance';

export function Dropdown({
  maintenance,
  setEditFormData,
  productsSheetData,
  setProductsSheetData,
  tableData,
  setTableData,
}: any) {
  const { setIsLoading } = useLoading();
  async function deleteMaintenance(id: any) {
    setIsLoading(true);
    setEditFormData({
      name: '',
      ambientId: '',
    });

    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/maintenance/${id}`,
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
            'Erro ao deletar Manutenção. Tente novamente.',
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
        title: 'Manutenção deletada com sucesso!',
        variant: 'destructive',
      });
      setIsLoading(false);
    }, 300);
    return;
  }

  function editMaintenance(maintenance: any) {
    console.log(maintenance);
    setEditFormData(() => ({
      name: maintenance.name,
      ambientId: maintenance.ambientId._id,
      id: maintenance._id,
    }));

    document.getElementById('open-edit-form')?.click();

    return;
  }

  const handleProductSheet = (maintenance: any) => {
    console.log(maintenance.products);
    setProductsSheetData(maintenance.products);

    console.log(productsSheetData);

    document.getElementById('open-products-sheet')?.click();

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
            Ações na manutenção
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => handleProductSheet(maintenance)}
          >
            Produtos comprados
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => editMaintenance(maintenance)}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              deleteMaintenance(maintenance._id)
            }
          >
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
