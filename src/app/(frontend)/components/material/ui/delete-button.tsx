'use client';

import { standardToast } from '@/lib/utils';
import { deleteMaterialRequest } from '@/requests/material-requests';
import { Button } from '@ui/shadcn/button';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({
  id,
  path
}: {
  id: string;
  path?: string;
}) {
  const router = useRouter();

  async function deleteMaterial(id: string, path?: string) {
    const result = await deleteMaterialRequest(id);
    standardToast(result.message, {
      description: result.action
    });
    if (path) return router.push(path);
    router.refresh();
  }

  return (
    <Button
      onClick={() => deleteMaterial(id, path)}
      variant={'destructive'}
    >
      <Trash2Icon />
    </Button>
  );
}
