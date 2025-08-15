import { getAllBagsAction } from '@/actions/bags-actions';
import BagForm from '@components/bag/bag-form';
import BagList from '@components/bag/bag-list';

export default async function Bags() {
  const bags = await getAllBagsAction();

  return (
    <div className='space-y-20 min-w-1/2'>
      <BagForm />
      <BagList bags={bags} />
    </div>
  );
}
