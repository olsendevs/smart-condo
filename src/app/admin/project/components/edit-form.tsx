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

export function EditProjectForm({
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
        `${process.env.NEXT_PUBLIC_API_URL}/project/${formData.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            name: formData.name,
            budget: formData.budget,
            startDate: formData.startDate,
            endDate: formData.endDate,
            assemblyApproval: formData.assemblyApproval,
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
          title: 'Erro ao editar projeto. Tente novamente.',
          variant: 'destructive',
          description: responseData.message,
        });
        return;
      }

      toast({
        title: 'Projecto editado com sucesso!',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Erro ao editar project.',
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
          <SheetTitle>Editar projeto</SheetTitle>
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
                  budget: formData.budget,
                  startDate: formData.startDate,
                  endDate: formData.endDate,
                  assemblyApproval:
                    formData.assemblyApproval,
                  id: formData.id,
                });
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="budget" className="text-right">
              Budget
            </Label>
            <Input
              value={formData.budget}
              onChange={(e) => {
                setFormData({
                  name: formData.name,
                  budget: e.target.value,
                  startDate: formData.startDate,
                  endDate: formData.endDate,
                  assemblyApproval:
                    formData.assemblyApproval,
                  id: formData.id,
                });
              }}
              id="edit-budget"
              className="col-span-3"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="startDate"
              className="text-right"
            >
              Data de inicio
            </Label>
            <Input
              value={formData.startDate.split('T')[0]}
              onChange={(e) => {
                setFormData({
                  name: formData.name,
                  budget: formData.budget,
                  startDate: e.target.value,
                  endDate: formData.endDate,
                  assemblyApproval:
                    formData.assemblyApproval,
                  id: formData.id,
                });
              }}
              id="edit-startDate"
              className="col-span-3"
              type="date"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              Data de finalização
            </Label>
            <Input
              value={formData.endDate.split('T')[0]}
              onChange={(e) => {
                setFormData({
                  name: formData.name,
                  budget: formData.budget,
                  startDate: formData.startDate,
                  endDate: e.target.value,
                  assemblyApproval:
                    formData.assemblyApproval,
                  id: formData.id,
                });
              }}
              id="edit-endDate"
              className="col-span-3"
              type="date"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="username"
              className="text-right"
            >
              Aprovação da assembléia
            </Label>
            <SelectForm
              value={`${formData.assemblyApproval}`}
              onChange={(e: any) => {
                setFormData({
                  name: formData.name,
                  budget: formData.budget,
                  startDate: formData.startDate,
                  endDate: formData.endDate,
                  assemblyApproval: e,
                  id: formData.id,
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
