import { createMaterialGroupAction } from '@/actions/materials-actions';
import {
  MaterialGroupFormData,
  materialGroupFormSchema
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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function MaterialGroupForm() {
  const router = useRouter();
  const hookForm = useForm<MaterialGroupFormData>({
    resolver: zodResolver(materialGroupFormSchema),
    defaultValues: {
      name: ''
    }
  });

  async function onSubmit(materialGroupInputValues: MaterialGroupFormData) {
    const result = await createMaterialGroupAction(materialGroupInputValues);
    alert(result.message);
    if (result.success) {
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
              <FormLabel>Grupo</FormLabel>
              <FormControl>
                <Input
                  placeholder='Digite o nome do grupo'
                  type='text'
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
