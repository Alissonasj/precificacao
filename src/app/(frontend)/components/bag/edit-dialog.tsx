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
};

export default function EditDialog({ title, children }: EditDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
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
