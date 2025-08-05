import { BagSelectDatabase } from '@/types/bag';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@ui/shadcn/card';
import Link from 'next/link';
import DeleteButton from './ui/delete-button';

export default function BagList({ bags }: { bags: BagSelectDatabase[] }) {
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
              <DeleteButton id={b.id!} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
