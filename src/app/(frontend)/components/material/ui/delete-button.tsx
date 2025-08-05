'use client';

import { deleteMaterialAction } from '@/actions';
import { Button } from '@ui/shadcn/button';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function deleteMaterial(id: string) {
    const result = await deleteMaterialAction(id);
    alert(result.message);
    router.push('/materials');
  }

  return <Button onClick={() => deleteMaterial(id)}>Apagar</Button>;
}
