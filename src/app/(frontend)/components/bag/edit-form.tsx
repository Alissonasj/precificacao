'use client';

import { updateBagAction } from '@/actions/bags-actions';
import { BagFormData, bagFormSchema, BagSelectDatabase } from '@/types/bag';
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

type BagFormProps = {
  bagObject: BagSelectDatabase;
};

export default function EditForm({ bagObject }: BagFormProps) {
  const hookForm = useForm<BagFormData>({
    resolver: zodResolver(bagFormSchema),
    defaultValues: {
      name: bagObject?.name,
      hoursWorked: bagObject?.hoursWorked.toString(),
      suggestedPrice: bagObject?.suggestedPrice || 0
    }
  });
  const router = useRouter();

  async function onSubmit(bagInputValues: BagFormData) {
    const result = await updateBagAction(bagInputValues, bagObject.id);
    alert(`${result.message}\n${result.action}`);
    if (result.success) {
      hookForm.reset();
      router.push(`/bags/${bagInputValues.name.toLowerCase()}`);
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

        <Button type='submit'>Salvar</Button>
      </form>
    </Form>
  );
}
