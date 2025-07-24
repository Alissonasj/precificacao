'use client';

import { createMaterialGroupAction } from '@/actions';
import {
  MaterialGroupFormData,
  materialGroupFormSchema
} from '@/types/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@ui/form';
import { Input } from '@ui/input';
import { PlusCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

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

function MaterialGroupForm() {
  const hookForm = useForm<MaterialGroupFormData>({
    resolver: zodResolver(materialGroupFormSchema),
    defaultValues: {
      name: ''
    }
  });

  async function onSubmit(materialGroupInputValues: MaterialGroupFormData) {
    await createMaterialGroupAction(materialGroupInputValues);
  }

  return (
    <Form {...hookForm}>
      <form
        onSubmit={hookForm.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <FormField
          control={hookForm.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grupo</FormLabel>
              <FormControl>
                <Input
                  placeholder='Digite o nome do grupo'
                  type='text'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
