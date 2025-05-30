'use client';

import { createMaterialAction } from '@/actions';
import { materialFormSchema, MaterialFormSchema } from '@/types/material';
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
import MaterialDialog from './material-dialog';
import { MaterialGroupsSelect } from './material-groups-select';

export default function MaterialForm() {
  const defaultValues = {
    name: '',
    group: '',
    price: '',
    baseWidth: '0'
  };
  const hookForm = useForm<MaterialFormSchema>({
    resolver: zodResolver(materialFormSchema),
    defaultValues
  });

  async function onSubmit(materialInputValues: MaterialFormSchema) {
    await createMaterialAction(materialInputValues);
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
                  <FormLabel>Nome do material</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Digite o nome do material'
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
              name='fkGroup'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grupo</FormLabel>
                  <MaterialGroupsSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <MaterialDialog />
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-4'>
            <FormField
              control={hookForm.control}
              name='baseWidth'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lagura base (em cm)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Digite a lagura base se houver'
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
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Digite o preço do material'
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
