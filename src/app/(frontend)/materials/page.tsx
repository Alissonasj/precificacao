'use client';

import { getAllMaterialsAction } from '@/actions';
import { MaterialSelectDatabase } from '@/types/material';
import MaterialForm from '@components/material-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@ui/shadcn/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Materials() {
  const [materials, setMaterials] = useState<MaterialSelectDatabase[]>();

  async function fetchMaterials() {
    const result = await getAllMaterialsAction();
    setMaterials(result);
  }

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className='space-y-20 min-w-1/2'>
      <MaterialForm />
      <div className='space-y-4 overflow-y-auto'>
        {materials?.map((m) => {
          return (
            <Link
              className='block hover:shadow transition-shadow duration-300'
              href={`/materials/${m.name.toLowerCase()}`}
              key={m.id}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h1>{m.name}</h1>
                    <CardDescription>{m.id}</CardDescription>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    <li>Preço: {m.price}</li>
                    <li>Largura Base: {m.baseWidth} cm</li>
                    <li>Grupo: {m.fkGroup}</li>
                    <li>Criado em: {m.createdAt.toString()}</li>
                    <li>Atualizado em: {m.updatedAt.toString()}</li>
                    <li>Tipo de cálculo: {m.calculationType}</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
