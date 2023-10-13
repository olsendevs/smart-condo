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

export function EditMaintenanceForm({
  formData,
  setFormData,
  setUpdateData,
}: any) {
  const { setIsLoading } = useLoading();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/maintenance/${formData.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            name: formData.name,
            ambientId: formData.ambientId,
            products: formData.products,
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
            'Erro ao editar manutenção. Tente novamente.',
          variant: 'destructive',
          description: responseData.message,
        });
        return;
      }

      toast({
        title: 'Manutenção editada com sucesso!',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Erro ao editar manutenção.',
        variant: 'destructive',
      });
    }

    setTimeout(() => {
      setUpdateData(new Date());
      setIsLoading(false);
    }, 300);
  };

  return (
    <Sheet>
      <SheetTrigger
        id="open-edit-form"
        className="hidden"
      ></SheetTrigger>
      <SheetContent className="w-auto max-w-none">
        <SheetHeader>
          <SheetTitle>Editar manutenção</SheetTitle>
          <SheetDescription>
            Edite os dados e em seguida clique em salvar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Nome
            </Label>
            <Input
              value={formData.name}
              onChange={(e) => {
                setFormData({
                  name: e.target.value,
                  ambientId: formData.ambientId,
                  id: formData.id,
                });
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="ambient" className="text-left">
              Ambiente
            </Label>
            <SelectForm
              value={formData.ambientId}
              onChange={(e: any) => {
                setFormData({
                  id: formData.id,
                  name: formData.name,
                  ambientId: e,
                });
              }}
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
