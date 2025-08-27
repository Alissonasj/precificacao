import { getOneBagRequest } from '@/requests/bag-requests';
import EditDialog from '@components/bag/edit-dialog';
import EditForm from '@components/bag/edit-form';
import PrecificationDialog from '@components/bag/precification-dialog';
import PrecificationForm from '@components/bag/precification-form';
import DeleteButton from '@components/bag/ui/delete-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@ui/shadcn/card';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

type BagDetailsProps = {
  params: Promise<{ name: string }>;
};

export default async function BagDetails({ params }: BagDetailsProps) {
  const { name } = await params;
  const { bag, usedMaterials } = await getOneBagRequest(name);

  return (
    <div className='space-y-4'>
      <h1 className='text-3xl mb-10'>
        Detalhes da <strong>{bag.name}</strong>
      </h1>
      <Link
        href='/bags'
        className='inline-block border px-3 py-1 hover:bg-black hover:text-white rounded-md'
      >
        <ChevronLeftIcon />
      </Link>
      <Card>
        <CardHeader>
          <h3>{bag.name}</h3>
          <CardDescription>{bag.id}</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-between'>
          <ul>
            <li>Preço: {bag.suggestedPrice}</li>
            <li>Horas trabalhadas: {bag.hoursWorked}</li>
            <li>Criada em: {bag.createdAt.toString()}</li>
            <li>Atualizado em: {bag.updatedAt.toString()}</li>
          </ul>
          <div className='flex gap-2.5'>
            <PrecificationDialog>
              <PrecificationForm
                bagName={bag.name}
                hoursWorked={bag.hoursWorked}
              />
            </PrecificationDialog>
            <EditDialog title='Edite a Bolsa'>
              <EditForm bagObject={bag} />
            </EditDialog>
            <DeleteButton
              id={bag.id}
              path='/bags'
            />
          </div>
        </CardContent>
      </Card>

      {usedMaterials.length > 0 && (
        <div className='space-y-2'>
          <h2 className='text-[1.2rem]'>Materiais Utilizados</h2>
          <div className='grid grid-cols-3 gap-4'>
            {usedMaterials.map((material) => {
              return (
                <Card key={material.id}>
                  <CardHeader>
                    <Link
                      href={`/materials/${material.fkMaterial.toLocaleLowerCase()}`}
                    >
                      <h2>
                        <strong>{material.fkMaterial}</strong>
                      </h2>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      <li>Unidades: {material.unity}</li>
                      <li>Largura: {material.width}</li>
                      <li>Comprimento: {material.length}</li>
                      <li>Camadas: {material.layers}</li>
                      <li>Preço Calculado: {material.calculatedPrice}</li>
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
