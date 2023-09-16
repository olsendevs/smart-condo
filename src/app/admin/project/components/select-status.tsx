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
        <SelectItem value="true">Aprovado</SelectItem>
        <SelectItem value="false">Não aprovado</SelectItem>
      </SelectContent>
    </Select>
  );
}
