import { getOneBagAction } from '@/actions';
import PrecificationForm from '@components/precification-form';

type BagDetailsProps = {
  params: Promise<{ name: string }>;
};

export default async function BagDetails({ params }: BagDetailsProps) {
  const { name } = await params;
  const data = await getOneBagAction(name);

  return (
    <>
      <h1>Detalhes da bolsa</h1>
      <ul>
        <li>ID: {data.id}</li>
        <li>Nome: {data.name}</li>
        <li>Preço: {data.price}</li>
        <li>Horas trabalhadas: {data.hoursWorked}</li>
        <li>Criada em: {data.createdAt.toString()}</li>
        <li>Atualizando em: {data.updatedAt.toString()}</li>
      </ul>

      <PrecificationForm />
    </>
  );
}
