import { getOneBagAction } from '@/actions/bags-actions';
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

type BagDetailsProps = {
  params: Promise<{ name: string }>;
};

export default async function BagDetails({ params }: BagDetailsProps) {
  const { name } = await params;
  const bag = await getOneBagAction(name);

  return (
    <Card>
      <CardHeader>
        <h1>
          Detalhes da <strong>{bag.name}</strong>
        </h1>
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
          <DeleteButton id={bag.id} />
        </div>
      </CardContent>
    </Card>
  );
}
