'use client';

import { deleteMaterialAction } from '@/actions';
import { MaterialSelectDatabase } from '@/types/material';
import { Button } from '@ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@ui/shadcn/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MaterialList({
  materials
}: {
  materials: MaterialSelectDatabase[];
}) {
  const route = useRouter();

  async function deleteMaterial(materialId: string) {
    const result = await deleteMaterialAction(materialId);
    alert(result.message);
    route.refresh();
  }

  return (
    <div className='space-y-4 overflow-y-auto'>
      {materials?.map((m) => {
        return (
          <Card key={m.id}>
            <Link href={`/materials/${m.name.toLowerCase()}`}>
              <CardHeader>
                <CardTitle>
                  <h1>{m.name}</h1>
                  <CardDescription>{m.id}</CardDescription>
                </CardTitle>
              </CardHeader>
            </Link>
            <CardContent className='flex justify-between'>
              <ul>
                <li>Preço: {m.price}</li>
                <li>Largura Base: {m.baseWidth} cm</li>
                <li>Grupo: {m.fkGroup}</li>
                <li>Criado em: {m.createdAt.toString()}</li>
                <li>Atualizado em: {m.updatedAt.toString()}</li>
                <li>Tipo de cálculo: {m.calculationType}</li>
              </ul>
              <Button onClick={() => deleteMaterial(m.id ?? '')}>Apagar</Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
