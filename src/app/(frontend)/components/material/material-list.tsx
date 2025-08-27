import { MaterialSelectDb } from '@/types/material';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@ui/shadcn/card';
import Link from 'next/link';
import DeleteButton from './ui/delete-button';

export default function MaterialList({
  materials
}: {
  materials: MaterialSelectDb[];
}) {
  return (
    <div className='grid grid-cols-2 gap-4'>
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
              <DeleteButton id={m.id} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
