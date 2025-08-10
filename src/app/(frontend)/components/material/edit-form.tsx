'use client';

import { updateMaterialAction } from '@/actions';
import { CalculationType } from '@/types/calculation-type';
import {
  MaterialFormData,
  materialFormSchema,
  MaterialSelectDatabase
} from '@/types/material';
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

type EditFormProps = {
  materialObject: MaterialSelectDatabase;
};

export default function EditForm({ materialObject }: EditFormProps) {
  const router = useRouter();
  const hookForm = useForm<MaterialFormData>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: {
      name: materialObject.name,
      fkGroup: materialObject.fkGroup,
      price: materialObject.price.toString(),
      baseWidth: materialObject.baseWidth?.toString()
    }
  });

  async function onSubmit(materialInputValues: MaterialFormData) {
    const result = await updateMaterialAction(
      materialInputValues,
      materialObject.id
    );
    alert(`${result.message}\n${result.action}`);
    if (result.success) {
      hookForm.reset();
      router.push(`/materials/${materialInputValues.name}`);
    }
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
                      defaultValue={materialObject.calculationType}
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
        <Button type='submit'>Salvar</Button>
      </form>
    </Form>
  );
}
