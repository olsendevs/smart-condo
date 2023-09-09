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

export function CreateUserForm({
  formData,
  setFormData,
  tableData,
  setTableData,
}: any) {
  const { setIsLoading } = useLoading();
  const handleSubimit = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/`,
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const responseData = await response.json();

      if (response.status === 500) {
        toast({
          title:
            'Erro ao adicionar usuário. Tente novamente.',
          variant: 'destructive',
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
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        password: '',
        type: '',
      });
      setIsLoading(false);
    }, 300);
  };
  return (
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
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  name: e.target.value,
                  type: formData.type,
                  email: formData.email,
                  password: formData.password,
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  name: formData.name,
                  type: formData.type,
                  password: formData.password,
                  email: e.target.value,
                })
              }
              className="col-span-3"
              type="email"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="password"
              className="text-right"
            >
              Password
            </Label>
            <Input
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  name: formData.name,
                  type: formData.type,
                  email: formData.email,
                  password: e.target.value,
                })
              }
              className="col-span-3"
              type="password"
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
              onChange={(e: any) =>
                setFormData({
                  name: formData.name,
                  password: formData.password,
                  type: e,
                  email: formData.email,
                })
              }
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleSubimit}>
              Salvar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
      <Toaster />
    </Sheet>
  );
}
