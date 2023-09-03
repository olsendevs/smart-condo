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
import { SheetTrigger } from '@/components/ui/sheet';
import { MoreHorizontal } from 'lucide-react';
import { EditUserForm } from './edit-user-form';
import { useState } from 'react';

export function Dropdown({ user, data, setData }: any) {
  function deleteUser(id: any) {
    setData({
      name: '',
      email: '',
      type: '',
    });
    return;
  }

  function editUser(user: any) {
    setData(() => ({
      name: user.name,
      email: user.email,
      type: user.type,
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
            Ações no usuário
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(user.email)
            }
          >
            Copiar e-mail
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => editUser(user)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => deleteUser(user._id)}
          >
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
