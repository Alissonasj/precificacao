import { getAllMaterialsAction } from '@/actions';
import MaterialForm from '@components/material-form';
import MaterialList from '@components/material-list';

export default async function Materials() {
  const materials = await getAllMaterialsAction();

  return (
    <div className='space-y-20 min-w-1/2'>
      <MaterialForm />
      <MaterialList materials={materials} />
    </div>
  );
}
