import { getOneMaterialAction } from '@/actions';
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

export default async function Materials({ params }: MaterialProps) {
  const { name } = await params;
  const material = await getOneMaterialAction(name);

  return (
    <div>
      <ul>
        <Card key={material.id}>
          <CardHeader>
            <CardTitle>
              <li>{material.name}</li>
              <CardDescription>{material.id}</CardDescription>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <li>Preço: {material.price}</li>
            <li>Largura Base: {material.baseWidth} cm</li>
            <li>Grupo: {material.fkGroup}</li>
            <li>Criado em: {material.createdAt.toString()}</li>
            <li>Atualizado em: {material.updatedAt.toString()}</li>
            <li>Tipo de cálculo: {material.calculationType}</li>
          </CardContent>
        </Card>
      </ul>
    </div>
  );
}
