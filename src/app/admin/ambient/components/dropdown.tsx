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
import { Ambient } from '@/types/ambient';

export function Dropdown({
  ambient,
  setEditFormData,
  tableData,
  setTableData,
}: any) {
  const { setIsLoading } = useLoading();
  async function deleteAmbient(id: any) {
    setIsLoading(true);
    setEditFormData({
      name: '',
      email: '',
      type: '',
    });

    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ambient/${id}`,
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
            'Erro ao deletar ambiente. Tente novamente.',
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
        title: 'Ambiente deletado com sucesso!',
        variant: 'destructive',
      });
      setIsLoading(false);
    }, 300);
    return;
  }

  function editAmbient(ambient: any) {
    setEditFormData(() => ({
      name: ambient.name,
      description: ambient.description,
      id: ambient._id,
    }));

    document.getElementById('open-edit-form')?.click();

    return;
  }

  function printQRCode(ambient: Ambient) {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(
        `<html><head><title>${ambient.name}</title></head><body>`,
      );
      printWindow.document.write(
        `<div style='display: flex; flex-direction: column; flex-wrap: wrap; justify-content: center; align-items: center; font-family: system-ui;'>
          <h1>${ambient.name}</h1>
          <img src="${ambient.qrCode}" alt="QRCode" style='width: 50vw'/>
          <h4>${ambient.description}</h4>
          </div>`,
      );
      printWindow.document.write('</body></html>');
      printWindow.document.close();
    }
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
            Ações no ambiente
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => printQRCode(ambient)}
          >
            Imprimir QRCode
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => editAmbient(ambient)}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => deleteAmbient(ambient._id)}
          >
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
