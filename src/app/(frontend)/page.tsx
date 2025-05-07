'use client';

import { MaterialSelect } from '@/types/material';
import MaterialForm from '@components/material-form';
import { useEffect, useState } from 'react';

export default function Home() {
  const [materials, setMaterials] = useState<MaterialSelect[]>();

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/materials')
      .then((response) => response.json())
      .then((data: MaterialSelect[]) => setMaterials(data));
  }, []);

  return (
    <>
      <div className='flex'>
        <MaterialForm />
        <ul className='space-y-4 overflow-y-auto'>
          {materials?.map((m) => {
            return (
              <div key={m.id}>
                <li>Nome: {m.name}</li>
                <li>Preço: {m.price}</li>
                <li>Largura Base: {m.baseWidth} cm</li>
                <li>Criado em: {m.createdAt.toString()}</li>
                <li>Atualizado em: {m.updatedAt.toString()}</li>
                <li>Grupo: {m.group}</li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
