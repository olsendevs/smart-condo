'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

interface UserAuthFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  const FormSchema = z.object({
    email: z
      .string({
        required_error:
          'Preencha corretamente seu e-mail para continuar',
      })
      .email(),
    password: z.string({
      required_error: 'Digite sua senha para continuar',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [isLoading, setIsLoading] =
    React.useState<boolean>(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/auth/condominium';
    }, 3000);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      onChange={field.onChange}
                      defaultValue={field.value}
                      id="email"
                      placeholder="E-mail (Ex: user@example.com)"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      onChange={field.onChange}
                      defaultValue={field.value}
                      id="email"
                      placeholder="Senha"
                      type="password"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Acessar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
