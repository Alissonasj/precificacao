'use client';
import { BagSelectDatabase } from '@/types/bag';
import BagForm from '@components/bag-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@ui/shadcn/card';
import { useEffect, useState } from 'react';

export default function Bags() {
  const [bags, setBags] = useState<BagSelectDatabase[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/bags')
      .then((response) => response.json())
      .then((data) => setBags(data));
  }, []);

  return (
    <div className='space-y-20 min-w-1/2'>
      <BagForm />
      <ul className='space-y-4 overflow-y-auto'>
        {bags?.map((b) => {
          return (
            <Card key={b.id}>
              <CardHeader>
                <CardTitle>
                  <li>{b.name}</li>
                </CardTitle>
                <CardDescription>
                  <li>ID: {b.id}</li>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <li>Preço: {b.price}</li>
                <li>Horas trabalhadas: {b.hoursWorked}</li>
                <li>Criado em: {b.createdAt.toString()}</li>
                <li>Atualizado em: {b.updatedAt.toString()}</li>
              </CardContent>
            </Card>
          );
        })}
      </ul>
    </div>
  );
}
