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

export function EditAmbientForm({
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
        `${process.env.NEXT_PUBLIC_API_URL}/ambient/${formData.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
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
            'Erro ao editar ambiente. Tente novamente.',
          variant: 'destructive',
          description: responseData.message,
        });
        return;
      }

      toast({
        title: 'Ambiente editado com sucesso!',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Erro ao editar ambiente.',
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
        id="open-edit-form"
        className="hidden"
      ></SheetTrigger>
      <SheetContent className="w-auto max-w-none">
        <SheetHeader>
          <SheetTitle>Editar ambiente</SheetTitle>
          <SheetDescription>
            Edite os dados e em seguida clique em salvar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              value={formData.name}
              onChange={(e) => {
                setFormData({
                  name: e.target.value,
                  description: formData.description,
                  id: formData.id,
                });
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="description"
              className="text-right"
            >
              Descrição
            </Label>
            <Input
              value={formData.description}
              onChange={(e) => {
                setFormData({
                  name: formData.name,
                  description: e.target.value,
                  id: formData.id,
                });
              }}
              id="edit-description"
              className="col-span-3"
              type="text"
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
