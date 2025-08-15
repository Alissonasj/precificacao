'use client';

import { deleteMaterialAction } from '@/actions/materials-actions';
import { Button } from '@ui/shadcn/button';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function deleteMaterial(id: string) {
    const result = await deleteMaterialAction(id);
    alert(result.message);
    router.push('/materials');
  }

  return (
    <Button
      onClick={() => deleteMaterial(id)}
      variant={'destructive'}
    >
      <Trash2Icon />
    </Button>
  );
}
