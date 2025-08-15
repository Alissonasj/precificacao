'use client';

import { deleteBagAction } from '@/actions/bags-actions';
import { Button } from '@ui/shadcn/button';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const route = useRouter();

  async function deleteBag(id: string) {
    const result = await deleteBagAction(id);
    alert(result.message);
    route.push('/bags');
  }

  return (
    <Button
      onClick={() => deleteBag(id)}
      variant={'destructive'}
    >
      <Trash2Icon />
    </Button>
  );
}
