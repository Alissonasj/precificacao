'use client';

import { createPrecificationAction, getOneMaterialAction } from '@/actions';
import { CalculationType } from '@/types/calculation-type';
import {
  PrecificationFormData,
  precificationFormSchema
} from '@/types/precification';
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
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import MaterialSelect from './material-select';

export default function PrecificationForm({ bagName }: { bagName: string }) {
  const hookForm = useForm<PrecificationFormData>({
    resolver: zodResolver(precificationFormSchema),
    defaultValues: {
      materials: [
        {
          fkMaterial: '',
          fkBag: bagName,
          layer: '0',
          unity: '0',
          width: '0',
          length: '0',
          price: '0',
          calculatedValue: '0'
        }
      ]
    }
  });
  const hookFields = useFieldArray({
    name: 'materials',
    control: hookForm.control
  });
  const [calculationType, setCalculationType] = useState<{
    [key: number]: string;
  }>({});

  async function onSubmit(formInputValues: PrecificationFormData) {
    await createPrecificationAction(formInputValues, bagName);
  }

  async function handleChange(value: string, index: number) {
    const result = await getOneMaterialAction(value);
    hookForm.setValue(`materials.${index}.fkMaterial`, value);
    setCalculationType({ ...calculationType, [index]: result.calculationType });
  }

  return (
    <Form {...hookForm}>
      <form
        onSubmit={hookForm.handleSubmit(onSubmit)}
        className='px-6 space-y-10'
      >
        {hookFields.fields.map((hookField, index) => {
          return (
            <section
              key={hookField.id}
              className='space-y-2.5'
            >
              <FormField
                control={hookForm.control}
                name={`materials.${index}.fkMaterial`}
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Material:</FormLabel>
                      <MaterialSelect
                        onValueChange={(value) => {
                          handleChange(value, index);
                        }}
                        defaultValue={field.value}
                      />
                      <FormMessage />
                    </FormItem>

                    <FormField
                      control={hookForm.control}
                      name={`materials.${index}.unity`}
                      disabled={
                        calculationType[index] !== CalculationType.UNITY
                      }
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unidade:</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Digite o número de unidades'
                              type='number'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={hookForm.control}
                      name={`materials.${index}.width`}
                      disabled={
                        calculationType[index] === CalculationType.UNITY ||
                        calculationType[index] === CalculationType.LENGTH
                      }
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Largura:</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Digite a largura'
                              type='number'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={hookForm.control}
                      name={`materials.${index}.layer`}
                      disabled={
                        calculationType[index] === CalculationType.UNITY
                      }
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Camadas:</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Digite o número de camadas'
                              type='number'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={hookForm.control}
                      name={`materials.${index}.length`}
                      disabled={
                        calculationType[index] === CalculationType.UNITY
                      }
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comprimento:</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Digite o comprimento'
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

              <Button
                type='button'
                onClick={() => hookFields.remove(index)}
              >
                Remove
              </Button>
            </section>
          );
        })}

        <div className='space-x-2.5'>
          <Button
            type='button'
            onClick={() =>
              hookFields.append({
                fkMaterial: '',
                fkBag: bagName,
                layer: '0',
                width: '0',
                unity: '0',
                length: '0',
                price: '0',
                calculatedValue: '0'
              })
            }
          >
            Add
          </Button>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </Form>
  );
}
