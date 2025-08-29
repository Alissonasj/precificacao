'use client';

import { Button } from '@ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@ui/shadcn/dialog';

type PrecificationDialogProps = {
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function PrecificationDialog({
  children,
  disabled
}: PrecificationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          disabled={disabled}
        >
          Precificar
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Precificação</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
