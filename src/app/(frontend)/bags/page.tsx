import { getAllBagsRequest } from '@/requests/bag-requests';
import BagForm from '@components/bag/bag-form';
import BagList from '@components/bag/bag-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/shadcn/tabs';

export default async function Bags() {
  const bags = await getAllBagsRequest();

  return (
    <div>
      <h1 className='text-3xl mb-10'>Bolsa</h1>
      <Tabs defaultValue='list'>
        <TabsList>
          <TabsTrigger value='list'>Lista</TabsTrigger>
          <TabsTrigger value='register'>Cadastro</TabsTrigger>
        </TabsList>
        <TabsContent value='list'>
          <BagList bags={bags} />
        </TabsContent>
        <TabsContent value='register'>
          <BagForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
