'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { Icons } from '@/components/ui/icons';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
export function CondominiumForm() {
  const router = useRouter();
  const [condominium, setCondominium] = React.useState([
    { _id: '', name: '' },
  ]);
  const [isLoading, setIsLoading] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/condominium/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const responseData = await response.json();
      setCondominium(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const FormSchema = z.object({
    condominium: z.string({
      required_error:
        'Selecione um condominio para continuar.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(
    data: z.infer<typeof FormSchema>,
  ) {
    setIsLoading(true);
    if (data.condominium) {
      Cookies.set(
        'currentCondominium',
        JSON.stringify(data.condominium),
      );
      localStorage.setItem(
        'condominium',
        JSON.stringify(
          condominium.find(
            (i) => i._id == data.condominium,
          ),
        ),
      );
    }
    setIsLoading(false);
    router.push('/admin/home');
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
                        value={item._id}
                        key={item._id}
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
