'use client';

import { deleteBagAction } from '@/actions';
import { BagSelectDatabase } from '@/types/bag';
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

export default function BagList({ bags }: { bags: BagSelectDatabase[] }) {
  const route = useRouter();

  async function deleteBag(id: string) {
    const result = await deleteBagAction(id);
    alert(result.message);
    route.refresh();
  }

  return (
    <div className='space-y-4 overflow-y-auto'>
      {bags?.map((b) => {
        return (
          <Card key={b.id}>
            <Link href={`/bags/${b.name.toLowerCase()}`}>
              <CardHeader>
                <CardTitle>{b.name}</CardTitle>
                <CardDescription>ID: {b.id}</CardDescription>
              </CardHeader>
            </Link>
            <CardContent className='flex justify-between'>
              <ul>
                <li>Preço Sugerido: {b.suggestedPrice}</li>
                <li>Horas trabalhadas: {b.hoursWorked}</li>
                <li>Criado em: {b.createdAt.toString()}</li>
                <li>Atualizado em: {b.updatedAt.toString()}</li>
              </ul>
              <Button onClick={() => deleteBag(b.id ?? '')}>Apagar</Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
