'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

export function SelectForm({ value, onChange }: any) {
  const [ambient, setAmbient] = useState([
    { _id: '', name: '' },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;

      const condominiumId = JSON.parse(
        localStorage.getItem('condominium') || '',
      )._id;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ambient/condominium/${condominiumId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const responseData = await response.json();
      setAmbient(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione" />
      </SelectTrigger>
      <SelectContent>
        {ambient.map((item) => {
          return (
            <SelectItem value={item._id} key={item._id}>
              {item.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
