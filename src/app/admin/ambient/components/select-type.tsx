'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SelectForm({ value, onChange }: any) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecione" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="employee">Empregado</SelectItem>
        <SelectItem value="manager">Sindico</SelectItem>
      </SelectContent>
    </Select>
  );
}
