import { Button } from '@ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@ui/shadcn/dialog';
import { PencilIcon } from 'lucide-react';

type EditDialogProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function EditDialog({
  title,
  children,
  disabled
}: EditDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          disabled={disabled}
        >
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
