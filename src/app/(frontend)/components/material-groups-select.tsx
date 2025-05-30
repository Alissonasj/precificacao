'use client';

import { MaterialGroupSelect } from '@/types/material';
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
  onValueChange: (value: string) => void;
  defaultValue?: string;
};

export function MaterialGroupsSelect({
  onValueChange,
  defaultValue
}: MaterialGroupsSelectProps) {
  const [materialsGroups, setMaterialsGroups] = useState<MaterialGroupSelect[]>(
    []
  );

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/material-groups')
      .then((response) => response.json())
      .then((data: MaterialGroupSelect[]) => setMaterialsGroups(data));
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
          {materialsGroups?.map((g) => {
            return (
              <SelectItem
                key={g.id}
                value={g.group}
              >
                {g.group}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
