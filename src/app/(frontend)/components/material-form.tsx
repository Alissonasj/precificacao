'use client';

import { createMaterialAction } from '@/actions';
import { CalculationType } from '@/types/calculation-type';
import { MaterialFormData, materialFormSchema } from '@/types/material';
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
import { RadioGroup, RadioGroupItem } from '@ui/shadcn/radio-group';
import { useForm } from 'react-hook-form';
import MaterialGroupDialog from './material-group-dialog';
import { MaterialGroupsSelect } from './material-groups-select';

export default function MaterialForm() {
  const hookForm = useForm<MaterialFormData>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: {
      name: '',
      fkGroup: '',
      price: '',
      baseWidth: '0'
    }
  });

  async function onSubmit(materialInputValues: MaterialFormData) {
    await createMaterialAction(materialInputValues);
  }

  return (
    <Form {...hookForm}>
      <form
        onSubmit={hookForm.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <div>
          <div>
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

        <div className='flex items-end gap-2.5'>
          <div className='grow'>
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
          </div>
          <MaterialGroupDialog />
        </div>

        <div className='space-y-8'>
          <FormField
            control={hookForm.control}
            name='calculationType'
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Tipo de calculo</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col'
                    >
                      <FormItem className='flex items-center gap-3'>
                        <FormControl>
                          <RadioGroupItem
                            value={CalculationType.LENGTH_WIDTH}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Comprimento / Largura
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center gap-3'>
                        <FormControl>
                          <RadioGroupItem value={CalculationType.LENGTH} />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Comprimento
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center gap-3'>
                        <FormControl>
                          <RadioGroupItem value={CalculationType.UNITY} />
                        </FormControl>
                        <FormLabel className='font-normal'>Unidade</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormField
                  control={hookForm.control}
                  name='baseWidth'
                  disabled={field.value !== CalculationType.LENGTH_WIDTH}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lagura base (em cm)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Digite a largura base'
                          type='number'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          />
        </div>

        <div>
          <div>
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
