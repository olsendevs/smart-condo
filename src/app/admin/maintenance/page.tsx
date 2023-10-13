'use client';

import React from 'react';
import { DataTable } from './components/data-table';
import { Maintenance } from '@/types/maintenance';
import { columns } from './components/columns';
import 'dotenv/config';
import { LoadingSpinner } from '@/components/admin/loading-spinner';
import { CreateMaintenanceForm } from './components/create-form';
import { EditMaintenanceForm } from './components/edit-form';
import { ProductsSheet } from './components/products-sheet';

export default function Maintenance() {
  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [updateData, setUpdateData] = React.useState(
    new Date(),
  );

  const [editFormData, setEditFormData] = React.useState({
    name: '',
    ambientId: '',
  });

  const [productsSheetData, setProductsSheetData] =
    React.useState([
      {
        name: '',
        invoice: '',
        price: 0,
        buyDate: '',
        guaranteeDate: '',
        employeeId: '',
        image: '',
      },
    ]);

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
          `${process.env.NEXT_PUBLIC_API_URL}/maintenance/condominium/${condominiumId}`,
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
      <h1 className="pb-2">Manutenções</h1>
      <DataTable
        columns={columns({
          editFormData,
          setEditFormData,
          productsSheetData,
          setProductsSheetData,
          tableData,
          setTableData,
        })}
        data={tableData}
      />
      <CreateMaintenanceForm
        tableData={tableData}
        setTableData={setTableData}
      />
      <div>
        <EditMaintenanceForm
          formData={editFormData}
          setFormData={setEditFormData}
          setUpdateData={setUpdateData}
        />
        <ProductsSheet
          productsSheetData={productsSheetData}
          setProductsSheetData={setProductsSheetData}
        />
      </div>
      <LoadingSpinner visible={isLoading} />
    </main>
  );
}
