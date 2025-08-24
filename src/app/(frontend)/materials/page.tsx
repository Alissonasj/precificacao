import { getAllMaterialsRequest } from '@/requests/material-requests';
import MaterialForm from '@components/material/material-form';
import MaterialList from '@components/material/material-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/shadcn/tabs';

export default async function Materials() {
  const materials = await getAllMaterialsRequest();

  return (
    <div>
      <h1 className='text-3xl mb-10'>Material</h1>
      <Tabs defaultValue='list'>
        <TabsList>
          <TabsTrigger value='list'>Lista</TabsTrigger>
          <TabsTrigger value='register'>Cadastro</TabsTrigger>
        </TabsList>
        <TabsContent value='list'>
          <MaterialList materials={materials} />
        </TabsContent>
        <TabsContent value='register'>
          <MaterialForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
