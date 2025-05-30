import { getOneBagAction } from '@/actions';
import { BagSelectDatabase } from '@/types/bag';
import PrecificationForm from '@components/precification-form';

type BagDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function BagDetails({ params }: BagDetailsProps) {
  const { id } = await params;
  const bag: BagSelectDatabase = await getOneBagAction(id);

  return (
    <>
      <h1>Detalhes da bolsa</h1>
      <ul>
        <li>ID: {bag.id}</li>
        <li>Nome: {bag.name}</li>
        <li>Preço: {bag.price}</li>
        <li>Horas trabalhadas: {bag.hoursWorked}</li>
        <li>Criada em: {bag.createdAt.toString()}</li>
        <li>Atualizando em: {bag.updatedAt.toString()}</li>
      </ul>

      <PrecificationForm />
    </>
  );
}
