'use client';

import { createBagRequest } from '@/requests/bag-requests';
import { BagFormData, bagFormSchema } from '@/types/bag';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/shadcn/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@ui/shadcn/form';
import { Input } from '@ui/shadcn/input';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  async function onSubmit(bagInputValues: BagFormData) {
    const result = await createBagRequest(bagInputValues);

    alert(`${result.message}\n${result.action}`);

    if (result?.success) {
      hookForm.reset();
      router.refresh();
    }
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

        <Button type='submit'>Cadastrar</Button>
      </form>
    </Form>
  );
}
