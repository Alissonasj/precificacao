'use client';

import { createMaterialGroupAction } from '@/actions';
import {
  materialGroupFormSchema,
  MaterialGroupFormSchema
} from '@/types/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

export default function MaterialDialog() {
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
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <MaterialGroupForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MaterialGroupForm() {
  const hookForm = useForm<MaterialGroupFormSchema>({
    resolver: zodResolver(materialGroupFormSchema),
    defaultValues: {
      group: ''
    }
  });

  async function onSubmit(materialGroupInputValues: MaterialGroupFormSchema) {
    await createMaterialGroupAction(materialGroupInputValues);
  }

  return (
    <Form {...hookForm}>
      <form
        onSubmit={hookForm.handleSubmit(onSubmit)}
        className='space-y-8 p-10'
      >
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-4'>
            <FormField
              control={hookForm.control}
              name='group'
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
          </div>
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
