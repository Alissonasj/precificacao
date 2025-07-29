'use client';
import { getAllBagsAction } from '@/actions';
import { BagSelectDatabase } from '@/types/bag';
import BagForm from '@components/bag-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@ui/shadcn/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Bags() {
  const [bags, setBags] = useState<BagSelectDatabase[]>([]);

  async function fetchBags() {
    const result = await getAllBagsAction();
    setBags(result);
  }

  useEffect(() => {
    fetchBags();
  }, []);

  return (
    <div className='space-y-20 min-w-1/2'>
      <BagForm />
      <div className='space-y-4 overflow-y-auto'>
        {bags?.map((b) => {
          return (
            <Link
              className='block hover:shadow transition-shadow duration-300'
              href={`/bags/${b.name}`}
              key={b.id}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{b.name}</CardTitle>
                  <CardDescription>ID: {b.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul>
                    <li>Preço Sugerido: {b.suggestedPrice}</li>
                    <li>Horas trabalhadas: {b.hoursWorked}</li>
                    <li>Criado em: {b.createdAt.toString()}</li>
                    <li>Atualizado em: {b.updatedAt.toString()}</li>
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
