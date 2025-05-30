'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form, FormField, FormItem } from '@ui/form';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import MaterialsSelect from './material-select';

const formSchema = z.object({
  material: z.array(
    z.object({
      name: z.string().min(1)
    })
  )
});

type FormData = z.infer<typeof formSchema>;

export default function PrecificationForm() {
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
                    <MaterialsSelect
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    />
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
