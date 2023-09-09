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

export function EditUserForm({
  formData,
  setFormData,
}: any) {
  return (
    <Sheet>
      <SheetTrigger
        id="open-edit-form"
        className="hidden"
      ></SheetTrigger>
      <SheetContent className="w-auto max-w-none">
        <SheetHeader>
          <SheetTitle>Editar usuário</SheetTitle>
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
                  email: formData.email,
                  type: formData.type,
                });
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              value={formData.email}
              onChange={(e) => {
                setFormData({
                  name: formData.email,
                  email: e.target.value,
                  type: formData.type,
                });
              }}
              id="edit-email"
              className="col-span-3"
              type="email"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="username"
              className="text-right"
            >
              Tipo
            </Label>
            <SelectForm
              value={formData.type}
              onValueChange={(e: any) => {
                setFormData({
                  name: formData.name,
                  email: formData.email,
                  type: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Salvar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
