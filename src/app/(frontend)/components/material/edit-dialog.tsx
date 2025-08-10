import { MaterialSelectDatabase } from '@/types/material';
import { Button } from '@ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@ui/shadcn/dialog';
import { PenIcon } from 'lucide-react';
import EditForm from './edit-form';

type EditDialogProps = {
  materialObject: MaterialSelectDatabase;
};

export default function EditDialog({ materialObject }: EditDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edite o Material</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <EditForm materialObject={materialObject} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
