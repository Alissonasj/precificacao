import { getOneMaterialAction } from '@/actions';
import EditDialog from '@components/material/edit-dialog';
import DeleteButton from '@components/material/ui/delete-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@ui/shadcn/card';

type MaterialProps = {
  params: Promise<{ name: string }>;
};

export default async function MaterialDetails({ params }: MaterialProps) {
  const { name } = await params;
  const material = await getOneMaterialAction(name);

  return (
    <div>
      <Card key={material.id}>
        <CardHeader>
          <CardTitle>
            <h1>{material.name}</h1>
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
            <EditDialog materialObject={material} />
            <DeleteButton id={material.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
