import { getOneMaterialRequest } from '@/requests/material-requests';
import EditDialog from '@components/material/edit-dialog';
import EditForm from '@components/material/edit-form';
import DeleteButton from '@components/material/ui/delete-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@ui/shadcn/card';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

type MaterialProps = {
  params: Promise<{ name: string }>;
};

export default async function MaterialDetails({ params }: MaterialProps) {
  const { name } = await params;
  const material = await getOneMaterialRequest(name);

  return (
    <div className='space-y-2'>
      <h1 className='text-3xl mb-10'>
        Detalhes da <strong>{material.name}</strong>
      </h1>
      <Link
        href='/materials'
        className='inline-block border px-3 py-1 hover:bg-black hover:text-white rounded-md'
      >
        <ChevronLeftIcon />
      </Link>
      <Card key={material.id}>
        <CardHeader>
          <CardTitle>
            <h3>{material.name}</h3>
            <CardDescription>{material.id}</CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex justify-between'>
          <ul>
            <li>Preço: {material.price}</li>
            <li>Largura Base: {material.baseWidth} cm</li>
            <li>Grupo: {material.fkGroup}</li>
            <li>Criado em: {material.createdAt.toString()}</li>
            <li>Atualizado em: {material.updatedAt.toString()}</li>
            <li>Tipo de cálculo: {material.calculationType}</li>
          </ul>
          <div className='flex gap-2.5'>
            <EditDialog title='Edite o Material'>
              <EditForm materialObject={material} />
            </EditDialog>
            <DeleteButton
              id={material.id}
              path='/materials'
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
