import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SelectForm } from './select-type';
import { useLoading } from '@/components/admin/is-loading';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import React, { useState } from 'react';

export function CreateUserForm({
  tableData,
  setTableData,
}: any) {
  const FormSchema = z.object({
    name: z.string({
      required_error: 'O nome é obrigatório',
    }),
    email: z
      .string({
        required_error: 'O e-mail é obrigatório',
      })
      .email(),
    password: z.string({
      required_error: 'A senha é obrigatória',
    }),
    type: z.string({
      required_error: 'O tipo é obrigatório',
    }),
    condominiumId: z.string({
      required_error: 'O condominio é obrigatório',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [condominium, setCondominium] = useState([
    { _id: '', name: '' },
  ]);

  const { isLoading, setIsLoading } = useLoading();

  async function onSubmit(
    data: z.infer<typeof FormSchema>,
  ) {
    setIsLoading(true);
    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const responseData = await response.json();

      if (
        response.status === 500 ||
        response.status === 400
      ) {
        toast({
          title:
            'Erro ao adicionar usuário. Tente novamente.',
          variant: 'destructive',
          description: responseData.message,
        });
        return;
      }

      setTableData([...tableData, responseData]);

      toast({
        title: 'Usuário adicionado com sucesso!',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Erro ao adicionar usuário.',
        variant: 'destructive',
      });
    }
    document.getElementById('close')?.click();

    setTimeout(() => {
      form.reset();
      setIsLoading(false);
    }, 300);
  }

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Sheet>
          <SheetTrigger
            id="open-create-form"
            className="hidden"
          ></SheetTrigger>
          <SheetContent
            side={'left'}
            className="w-auto max-w-none"
          >
            <SheetHeader>
              <SheetTitle>Criar usuário</SheetTitle>
              <SheetDescription>
                Inseria os dados e em seguida clique em
                salvar.
              </SheetDescription>
            </SheetHeader>
            <div className="grid w-auto gap-1 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="name"
                        className="text-right"
                      >
                        Nome
                      </Label>
                      <Input
                        id="name"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                        className="col-span-3"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="email"
                        className="text-right"
                      >
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                        className="col-span-3"
                        type="email"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="password"
                        className="text-right"
                      >
                        Senha
                      </Label>
                      <Input
                        id="password"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                        className="col-span-3"
                        type="password"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="username"
                        className="text-right"
                      >
                        Tipo
                      </Label>
                      <SelectForm
                        onChange={field.onChange}
                        defaultValue={field.value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="condominiumId"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="username"
                        className="text-right"
                      >
                        Condominio
                      </Label>
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
              </div>
            </div>

            <SheetFooter>
              <Button
                type="submit"
                onClick={() => {
                  document
                    .getElementById('submit')
                    ?.click();
                }}
              >
                Salvar
              </Button>
              <SheetClose asChild>
                <Button
                  type="submit"
                  id="close"
                  className="hidden"
                >
                  Salvar
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Button
          type="submit"
          className="hidden"
          id="submit"
        >
          Salvar
        </Button>
      </form>
      <Toaster />
    </Form>
  );
}
