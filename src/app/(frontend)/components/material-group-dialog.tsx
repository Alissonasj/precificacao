import { Button } from '@ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@ui/dialog';
import { PlusCircleIcon } from 'lucide-react';
import MaterialGroupForm from './material-group-form';

export default function MaterialGroupDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <PlusCircleIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Adicione um novo Grupo</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <MaterialGroupForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
