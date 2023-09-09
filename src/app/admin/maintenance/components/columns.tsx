'use client';

import { Maintenance } from '@/types/maintenance';

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
}: any): ColumnDef<Maintenance>[] {
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
      accessorKey: 'ambientId.name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="ml-[-14px]"
            onClick={() =>
              column.toggleSorting(
                column.getIsSorted() === 'asc',
              )
            }
          >
            Ambiente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const maintenance = row.original;

        return (
          <Dropdown
            maintenance={maintenance}
            setEditFormData={setEditFormData}
            setTableData={setTableData}
            tableData={tableData}
          />
        );
      },
    },
  ];
}
