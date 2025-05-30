'use client';

import { MaterialSelectDatabase } from '@/types/material';
import { FormControl } from '@ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@ui/select';
import { useEffect, useState } from 'react';

type MaterialSelectProps = {
  onValueChange?: (value: string) => void;
  defaultValue?: string;
};

export default function MaterialsSelect({
  onValueChange,
  defaultValue
}: MaterialSelectProps) {
  const [materialOptions, setMaterialsOptions] = useState<
    MaterialSelectDatabase[]
  >([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/materials')
      .then((response) => response.json())
      .then((data: MaterialSelectDatabase[]) => setMaterialsOptions(data));
  }, []);

  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
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
  );
}
