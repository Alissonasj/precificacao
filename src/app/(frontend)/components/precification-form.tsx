'use client';

import { MaterialSelect } from '@/types/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem } from '@ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@ui/select';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  material: z.array(
    z.object({
      name: z.string()
    })
  )
});

type FormData = z.infer<typeof formSchema>;

export default function PrecificationForm() {
  const [materialOptions, setMaterialsOptions] = useState<MaterialSelect[]>([]);
  const hookForm = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      material: [{ name: '' }]
    }
  });
  const hookFields = useFieldArray({
    name: 'material',
    control: hookForm.control
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/materials')
      .then((response) => response.json())
      .then((data: MaterialSelect[]) => setMaterialsOptions(data));
  }, []);

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Form {...hookForm}>
      <form onSubmit={hookForm.handleSubmit(onSubmit)}>
        {hookFields.fields.map((hookField, index) => {
          return (
            <section key={hookField.id}>
              <FormField
                control={hookForm.control}
                name={`material.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-180px'>
                          <SelectValue placeholder='Escolha o material' />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectGroup>
                          {materialOptions?.map((material) => {
                            return (
                              <SelectItem
                                key={material.id}
                                value={material.name}
                              >
                                {material.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
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
        <Button
          type='button'
          onClick={() => hookFields.append({ name: '' })}
        >
          Add
        </Button>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
