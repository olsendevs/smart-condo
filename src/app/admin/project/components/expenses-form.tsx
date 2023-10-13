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
import { SelectForm } from './select-status';

export function SendExpensesForm({
  formData,
  setFormData,
  setUpdateData,
}: any) {
  const { setIsLoading } = useLoading();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const user = JSON.parse(
        localStorage.getItem('user') || '',
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${formData.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            expenses: [
              {
                cost: formData.cost,
                sendDate: formData.sendDate,
              },
            ],
          }),
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
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
          title: 'Erro ao editar projeto. Tente novamente.',
          variant: 'destructive',
          description: responseData.message,
        });
        return;
      }

      toast({
        title: 'Despesa lançada com sucesso!',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Erro ao lançar despesa.',
        variant: 'destructive',
      });
    }
    document.getElementById('close')?.click();

    setTimeout(() => {
      setUpdateData(new Date());
      setIsLoading(false);
    }, 300);
  };

  return (
    <Sheet>
      <SheetTrigger
        id="open-expenses-form"
        className="hidden"
      ></SheetTrigger>
      <SheetContent className="w-auto max-w-none">
        <SheetHeader>
          <SheetTitle>
            Lançar despesas no projeto
          </SheetTitle>
          <SheetDescription>
            Preencha os dados e em seguida clique em salvar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="edit-cost"
              className="text-right"
            >
              Custo
            </Label>
            <Input
              value={formData.cost}
              onChange={(e) => {
                setFormData({
                  id: formData.id,
                  cost: e.target.value,
                  sendDate: formData.sendDate,
                });
              }}
              id="edit-cost"
              className="col-span-3"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="edit-sendDate"
              className="text-right"
            >
              Data da compra
            </Label>
            <Input
              value={formData.sendDate.split('T')[0]}
              onChange={(e) => {
                setFormData({
                  id: formData.id,
                  cost: formData.cost,
                  sendDate: e.target.value,
                });
              }}
              id="edit-sendDate"
              className="col-span-3"
              type="date"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={onSubmit}>
              Salvar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
