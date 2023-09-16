'use client';

import { Metadata } from 'next';
import React from 'react';
import { CondominiumForm } from './components/condominium-form';

export default function CondominiumPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="text-3xl font-semibold tracking-tight">
          Selecione o condomínio
        </h1>
        <p className="text-sm text-muted-foreground">
          Escolha o condomínio ao qual deseja
          alterar/analisar as informações
        </p>
        <CondominiumForm />
      </div>
    </>
  );
}
