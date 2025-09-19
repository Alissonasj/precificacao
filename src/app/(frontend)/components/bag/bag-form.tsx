'use client';

import { standardToast } from '@/lib/utils';
import { createBagRequest } from '@/requests/bag-requests';
import { BagFormData, bagFormSchema } from '@/types/bag';
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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function BagForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const hookForm = useForm<BagFormData>({
    resolver: zodResolver(bagFormSchema),
    defaultValues: {
      name: '',
      hoursWorked: '',
      suggestedPrice: 0
    }
  });
  const router = useRouter();

  async function onSubmit(bagInputValues: BagFormData) {
    const result = await createBagRequest({
      ...bagInputValues,
      photo: selectedFile
    });
    standardToast(result.message, {
      description: result.action
    });
    if (result?.success) {
      hookForm.reset();
      router.refresh();
    }
  }

  return (
    <Form {...hookForm}>
      <form
        onSubmit={hookForm.handleSubmit(onSubmit)}
        className='space-y-8 border p-5 rounded-md'
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

        <FormField
          control={hookForm.control}
          name='photo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto da Bolsa</FormLabel>
              <FormControl>
                <ImageUploader onFileSelect={setSelectedFile} />
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

type ImageUploaderProps = {
  onFileSelect: (file: File | null) => void;
};

function ImageUploader({ onFileSelect }: ImageUploaderProps) {
  // Estado para guardar o arquivo selecionado
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Estado para guardar a URL de preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Efeito para criar e limpar a URL de preview
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    // 1. Cria uma URL temporária para o objeto do arquivo
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // 2. Função de limpeza: revoga a URL para liberar memória
    // Isso é importante para evitar memory leaks (vazamentos de memória)
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // Função para lidar com a seleção do arquivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file =
      event.target.files && event.target.files[0]
        ? event.target.files[0]
        : null;

    setSelectedFile(file);

    onFileSelect(file);
  };

  return (
    <>
      <Input
        type='file'
        accept='image/*'
        onChange={handleFileChange}
      />

      {previewUrl && (
        <div style={{ marginTop: '20px' }}>
          <h4>Preview:</h4>
          <img
            src={previewUrl}
            alt='Preview da imagem selecionada'
            style={{ maxWidth: '300px', height: 'auto' }}
          />
        </div>
      )}
    </>
  );
}
