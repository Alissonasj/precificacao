'use client';

import { MaterialGroupSelectDatabase } from '@/types/material';
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

type MaterialGroupsSelectProps = {
  onValueChange?: (value: string) => void;
  defaultValue?: string;
};

export function MaterialGroupsSelect({
  onValueChange,
  defaultValue
}: MaterialGroupsSelectProps) {
  const [materialGroupsOptions, setMaterialGroupsOptions] = useState<
    MaterialGroupSelectDatabase[]
  >([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/material-groups')
      .then((response) => response.json())
      .then((data: MaterialGroupSelectDatabase[]) =>
        setMaterialGroupsOptions(data)
      );
  }, []);

  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <FormControl>
        <SelectTrigger className='w-180px'>
          <SelectValue placeholder='Escolha o grupo' />
        </SelectTrigger>
      </FormControl>

      <SelectContent>
        <SelectGroup>
          {materialGroupsOptions?.map((group) => {
            return (
              <SelectItem
                key={group.id}
                value={group.group}
              >
                {group.group}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
