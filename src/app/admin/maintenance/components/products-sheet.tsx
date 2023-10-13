import { Separator } from '@/components/ui/separator';
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

import { useEffect } from 'react';

export function ProductsSheet({
  productsSheetData,
  setProductsSheetData,
}: any) {
  useEffect(() => {
    console.log(productsSheetData);
  }, [productsSheetData]);
  return (
    <Sheet>
      <SheetTrigger
        id="open-products-sheet"
        className="hidden"
      ></SheetTrigger>
      <SheetContent className="w-auto max-w-none">
        <SheetHeader>
          <SheetTitle>
            Produtos comprados na manutenção
          </SheetTitle>
          <SheetDescription>
            Segue lista com produtos comprados nesta
            manutenção
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {productsSheetData.map((e: any) => {
            return (
              <div key={e._id}>
                <h1 className="text-base">
                  Nome do produto
                </h1>
                <p className="text-xs mb-4">{e.name}</p>
                <h1 className="text-base">Preço</h1>
                <p className="text-xs mb-4">R${e.price}</p>
                <h1 className="text-base">
                  Data da compra
                </h1>
                <p className="text-xs mb-4">
                  {e.buyDate.split('T')[0]}
                </p>
                <h1 className="text-base">
                  Data de garantia
                </h1>
                <p className="text-xs mb-4">
                  {e.guaranteeDate.split('T')[0]}
                </p>
                <h1 className="text-base">Nota fiscal</h1>
                <p className="text-xs mb-4">{e.invoice}</p>
                <h1 className="text-base">
                  Foto do produto
                </h1>
                <p className="text-xs mb-4">{e.image}</p>
                <Separator />
              </div>
            );
          })}
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
