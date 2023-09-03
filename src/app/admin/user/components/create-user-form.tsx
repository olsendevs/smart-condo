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

export function CreateUserForm({ name, type, email }: any) {
  return (
    <Sheet>
      <SheetTrigger
        id="open-create-form"
        className="hidden"
      ></SheetTrigger>
      <SheetContent className="w-[50vw] max-w-none">
        <SheetHeader>
          <SheetTitle>Criar usuário</SheetTitle>
          <SheetDescription>
            Inseria os dados e em seguida clique em salvar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="username"
              className="text-right"
            >
              Email
            </Label>
            <Input
              id="username"
              value={email}
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
            <SelectForm value={type} />
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
