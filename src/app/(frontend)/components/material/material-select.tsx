'use client';

import { getAllMaterialsRequest } from '@/requests/material-requests';
import { MaterialSelectDatabase } from '@/types/material';
import { FormControl } from '@ui/shadcn/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@ui/shadcn/select';
import { useEffect, useState } from 'react';

type MaterialSelectProps = {
  onValueChange?: (value: string) => void;
  defaultValue?: string;
};

export default function MaterialSelect({
  onValueChange,
  defaultValue
}: MaterialSelectProps) {
  const [materialOptions, setMaterialsOptions] = useState<
    MaterialSelectDatabase[]
  >([]);

  async function fetchMaterials() {
    const result = await getAllMaterialsRequest();
    setMaterialsOptions(result);
  }

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <FormControl className='w-full'>
        <SelectTrigger>
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
  );
}
