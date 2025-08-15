import { Button } from '@ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@ui/shadcn/dialog';
import { PenIcon } from 'lucide-react';
import React from 'react';

type EditDialogProps = {
  children?: React.ReactNode;
  title?: React.ReactNode;
};

export default function EditDialog({ title, children }: EditDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
