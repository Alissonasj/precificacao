import { getOneBagAction } from '@/actions';
import PrecificationForm from '@components/precification-form';

type BagDetailsProps = {
  params: Promise<{ name: string }>;
};

export default async function BagDetails({ params }: BagDetailsProps) {
  const { name } = await params;
  const { data } = await getOneBagAction(name);

  return (
    <>
      <h1>Detalhes da bolsa</h1>
      <ul>
        <li>ID: {data[0].id}</li>
        <li>Nome: {data[0].name}</li>
        <li>Preço: {data[0].price}</li>
        <li>Horas trabalhadas: {data[0].hoursWorked}</li>
        <li>Criada em: {data[0].createdAt.toString()}</li>
        <li>Atualizando em: {data[0].updatedAt.toString()}</li>
      </ul>

      <PrecificationForm />
    </>
  );
}
