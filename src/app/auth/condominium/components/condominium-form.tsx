'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useEffect, useState } from 'react';
import React from 'react';
import { Icons } from '@/components/ui/icons';

export function CondominiumForm() {
  const [condominium, setCondominium] = useState([
    { id: 0, name: '' },
  ]);
  const [isLoading, setIsLoading] =
    React.useState<boolean>(false);

  useEffect(() => {
    setCondominium([
      { id: 1, name: 'Condominio A' },
      { id: 2, name: 'Condominio B' },
      { id: 3, name: 'Condominio C' },
      { id: 4, name: 'Condominio D' },
    ]);
  }, []);

  const FormSchema = z.object({
    condominium: z.string({
      required_error:
        'Selecione um condominio para continuar.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/';
    }, 3000);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[30vw] space-y-6 mt-5"
      >
        <FormField
          control={form.control}
          name="condominium"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o condominio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {condominium.map((item) => {
                    return (
                      <SelectItem
                        value={item.name}
                        key={item.id}
                      >
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center">
          <Button
            disabled={isLoading}
            className="w-[15vw]"
            type="submit"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Prosseguir
          </Button>
        </div>
      </form>
    </Form>
  );
}
