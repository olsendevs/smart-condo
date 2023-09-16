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
import { useLoading } from '@/components/admin/is-loading';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { SelectForm } from './select-status';

export function CreateProjectForm({
  tableData,
  setTableData,
}: any) {
  const FormSchema = z.object({
    name: z.string({
      required_error: 'O nome é obrigatório',
    }),
    budget: z.string({
      required_error: 'O budget é obrigatório',
    }),
    startDate: z.string({
      required_error: 'A data de inicio é obrigatória',
    }),
    endDate: z.string({
      required_error: 'A data de termino é obrigatória',
    }),
    assemblyApproval: z.string({
      required_error:
        'A aprovação da assembléia é obrigatória',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { isLoading, setIsLoading } = useLoading();
  async function onSubmit(
    data: z.infer<typeof FormSchema>,
  ) {
    setIsLoading(true);
    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;

      const condominium = JSON.parse(
        localStorage.getItem('condominium') || '',
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...data,
            condominiumId: condominium._id,
          }),
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
            'Erro ao adicionar project. Tente novamente.',
          variant: 'destructive',
          description: responseData.message,
        });
        return;
      }

      setTableData([...tableData, responseData]);

      toast({
        title: 'Projecte adicionado com sucesso!',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Erro ao adicionar project.',
        variant: 'destructive',
      });
    }
    document.getElementById('close')?.click();

    setTimeout(() => {
      form.reset();
      setIsLoading(false);
    }, 300);
  }
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
              <SheetTitle>Criar projeto</SheetTitle>
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
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="budget"
                        className="text-right"
                      >
                        Budget
                      </Label>
                      <Input
                        id="budget"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                        className="col-span-3"
                        type="number"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="startDate"
                        className="text-right"
                      >
                        Data inicial
                      </Label>
                      <Input
                        id="startDate"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                        className="col-span-3"
                        type="date"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="endDate"
                        className="text-right"
                      >
                        Data final
                      </Label>
                      <Input
                        id="endDate"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                        className="col-span-3"
                        type="date"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="assemblyApproval"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="status"
                        className="text-right"
                      >
                        Aprovação da assembléia
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
