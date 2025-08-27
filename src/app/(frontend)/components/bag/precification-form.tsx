'use client';

import { standardToast } from '@/lib/utils';
import { getAllMaterialsRequest } from '@/requests/material-requests';
import { createPrecificationRequest } from '@/requests/precification-requests';
import { CalculationType } from '@/types/calculation-type';
import { MaterialSelectDb } from '@/types/material';
import {
  PrecificationFormData,
  precificationFormSchema
} from '@/types/precification';
import MaterialSelect from '@components/material/material-select';
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
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export default function PrecificationForm({
  bagName,
  hoursWorked
}: {
  bagName: string;
  hoursWorked: number;
}) {
  const hookForm = useForm<PrecificationFormData>({
    resolver: zodResolver(precificationFormSchema),
    defaultValues: {
      materials: [
        {
          fkMaterial: '',
          fkBag: bagName,
          layers: '0',
          unity: '0',
          width: '0',
          length: '0'
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
  const [materialOptions, setMaterialsOptions] = useState<MaterialSelectDb[]>(
    []
  );
  const router = useRouter();

  async function fetchMaterials() {
    const result = await getAllMaterialsRequest();
    setMaterialsOptions(result);
  }

  useEffect(() => {
    fetchMaterials();
  }, []);

  async function onSubmit(formInputValues: PrecificationFormData) {
    const result = await createPrecificationRequest(
      formInputValues,
      bagName,
      hoursWorked
    );
    standardToast(result.message, {
      description: result.action
    });
    if (result.success) {
      hookForm.reset();
      hookFields.remove();
      router.refresh();
    }
  }

  async function handleChange(materialName: string, index: number) {
    const result = materialOptions.find(
      (material) => material.name === materialName
    );

    hookForm.setValue(`materials.${index}.fkMaterial`, materialName);
    setCalculationType({
      ...calculationType,
      [index]: result!.calculationType
    });
  }

  return (
    <Form {...hookForm}>
      <form
        onSubmit={hookForm.handleSubmit(onSubmit)}
        className='px-6 space-y-8 rounded-md'
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
                        materialOptions={materialOptions}
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
                      name={`materials.${index}.layers`}
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
                variant={'destructive'}
                onClick={() => hookFields.remove(index)}
              >
                <MinusCircleIcon />
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
                layers: '0',
                width: '0',
                unity: '0',
                length: '0'
              })
            }
          >
            <PlusCircleIcon />
          </Button>
          <Button
            type='submit'
            variant={'outline'}
          >
            Precificar
          </Button>
        </div>
      </form>
    </Form>
  );
}
