'use client';

import { MaterialSelectDatabase } from '@/types/material';
import MaterialForm from '@components/material-form';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/shadcn/card';
import { useEffect, useState } from 'react';

export default function Home() {
  const [materials, setMaterials] = useState<MaterialSelectDatabase[]>();

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/materials')
      .then((response) => response.json())
      .then((data) => setMaterials(data));
  }, []);

  return (
    <div className='space-y-20 min-w-1/2'>
      <MaterialForm />
      <ul className='space-y-4 overflow-y-auto'>
        {materials?.map((m) => {
          return (
            <Card key={m.id}>
              <CardHeader>
                <CardTitle>
                  <li>{m.name}</li>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <li>Preço: {m.price}</li>
                <li>Largura Base: {m.baseWidth} cm</li>
                <li>Grupo: {m.fkGroup}</li>
                <li>Criado em: {m.createdAt.toString()}</li>
                <li>Atualizado em: {m.updatedAt.toString()}</li>
                <li>Tipo de cálculo: {m.calculationType}</li>
              </CardContent>
            </Card>
          );
        })}
      </ul>
    </div>
  );
}
