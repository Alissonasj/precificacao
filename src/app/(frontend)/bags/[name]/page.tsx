import { getOneBagAction } from '@/actions';
import PrecificationForm from '@components/precification-form';
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
      <CardContent>
        <div>Preço: {bag.price}</div>
        <div>Horas trabalhadas: {bag.hoursWorked}</div>
        <div>Criada em: {bag.createdAt.toString()}</div>
        <div>Atuadivzando em: {bag.updatedAt.toString()}</div>
      </CardContent>

      <PrecificationForm bagName={bag.name} />
    </Card>
  );
}
