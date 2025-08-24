'use client';

import { standardToast } from '@/lib/utils';
import { createMaterialRequest } from '@/requests/material-requests';
import { CalculationType } from '@/types/calculation-type';
import { MaterialFormData, materialFormSchema } from '@/types/material';
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
import { RadioGroup, RadioGroupItem } from '@ui/shadcn/radio-group';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import MaterialGroupDialog from './material-group-dialog';
import MaterialGroupsSelect from './material-groups-select';

export default function MaterialForm() {
  const router = useRouter();
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
    const result = await createMaterialRequest(materialInputValues);
    standardToast(result.message, {
      description: result.action
    });
    if (result.success) {
      hookForm.reset();
      router.refresh();
    }
  }

  return (
    <Form {...hookForm}>
      <form
        onSubmit={hookForm.handleSubmit(onSubmit)}
        className='space-y-8 border-1 p-5 rounded-md'
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
          <div>
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
        <Button type='submit'>Cadastrar</Button>
      </form>
    </Form>
  );
}
