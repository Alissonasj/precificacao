'use client';

import { createBagAction } from '@/actions';
import { BagFormData, bagFormSchema } from '@/types/bag';
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
  const hookForm = useForm<BagFormData>({
    resolver: zodResolver(bagFormSchema),
    defaultValues: {
      name: '',
      hoursWorked: '',
      suggestedPrice: 0
    }
  });

  async function onSubmit(bagInputValues: BagFormData) {
    await createBagAction(bagInputValues);
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

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
