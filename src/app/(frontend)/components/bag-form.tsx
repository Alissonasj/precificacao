'use client';

import { createBagAction } from '@/actions';
import { bagFormSchema, BagFormSchema } from '@/types/bag';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@ui/form';
import { Input } from '@ui/input';
import { useForm } from 'react-hook-form';

export default function BagForm() {
  const defaultValues = {
    name: '',
    hoursWorked: '',
    price: ''
  };

  const hookForm = useForm<BagFormSchema>({
    resolver: zodResolver(bagFormSchema),
    defaultValues
  });

  async function onSubmit(bagInputValues: BagFormSchema) {
    await createBagAction(bagInputValues);
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
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da bolsa</FormLabel>
                  <FormControl>
                    <Input
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

        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-4'>
            <FormField
              control={hookForm.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-4'>
            <FormField
              control={hookForm.control}
              name='hoursWorked'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas trabalhadas</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
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
