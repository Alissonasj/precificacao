'use client';
import { BagSelect } from '@/types/bag';
import BagForm from '@components/bag-form';
import { useEffect, useState } from 'react';

export default function Bags() {
  const [bags, setBags] = useState<BagSelect[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/bags')
      .then((response) => response.json())
      .then((data) => setBags(data));
  }, []);

  return (
    <>
      <div className='flex'>
        <BagForm />
        <ul className='space-y-4 overflow-y-auto'>
          {bags?.map((b) => {
            return (
              <div key={b.id}>
                <li>ID: {b.id}</li>
                <li>Nome: {b.name}</li>
                <li>Preço: {b.price}</li>
                <li>Horas trabalhadas: {b.hoursWorked}</li>
                <li>Criado em: {b.createdAt.toString()}</li>
                <li>Atualizado em: {b.updatedAt.toString()}</li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
