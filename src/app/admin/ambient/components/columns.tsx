'use client';

import { Ambient } from '@/types/ambient';

import { ColumnDef } from '@tanstack/react-table';

import React from 'react';
import { Dropdown } from './dropdown';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export function columns({
  editFormData,
  setEditFormData,
  tableData,
  setTableData,
}: any): ColumnDef<Ambient>[] {
  return [
    {
      accessorKey: '_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(
                column.getIsSorted() === 'asc',
              )
            }
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(
                column.getIsSorted() === 'asc',
              )
            }
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-start ml-4">
            {row.getValue('name')}
          </div>
        );
      },
    },
    {
      accessorKey: 'description',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(
                column.getIsSorted() === 'asc',
              )
            }
          >
            Descrição
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const ambient = row.original;

        return (
          <Dropdown
            ambient={ambient}
            setEditFormData={setEditFormData}
            setTableData={setTableData}
            tableData={tableData}
          />
        );
      },
    },
  ];
}
