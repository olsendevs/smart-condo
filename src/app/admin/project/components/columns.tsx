'use client';

import { Project } from '@/types/project';

import { ColumnDef } from '@tanstack/react-table';

import React from 'react';
import { Dropdown } from './dropdown';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export function columns({
  editFormData,
  setEditFormData,
  setSendExpensesData,
  tableData,
  setTableData,
}: any): ColumnDef<Project>[] {
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
      accessorKey: 'startDate',
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
            Data inicial
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'assemblyApprovalLabel',
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
            Aprovado na assembléia
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const project = row.original;

        return (
          <Dropdown
            project={project}
            setEditFormData={setEditFormData}
            setSendExpensesData={setSendExpensesData}
            setTableData={setTableData}
            tableData={tableData}
          />
        );
      },
    },
  ];
}
