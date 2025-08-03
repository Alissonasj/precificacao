import { getAllMaterialGroupsAction } from '@/actions';
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

export default function MaterialGroupsSelect({
  onValueChange,
  defaultValue
}: MaterialGroupsSelectProps) {
  const [materialGroupsOptions, setMaterialGroupsOptions] = useState<
    MaterialGroupSelectDatabase[]
  >([]);

  async function fetchMaterialGroups() {
    const result = await getAllMaterialGroupsAction();
    setMaterialGroupsOptions(result);
  }

  useEffect(() => {
    fetchMaterialGroups();
  }, []);

  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <FormControl className='w-full'>
        <SelectTrigger>
          <SelectValue placeholder='Escolha o grupo' />
        </SelectTrigger>
      </FormControl>

      <SelectContent>
        <SelectGroup>
          {materialGroupsOptions?.map((group) => {
            return (
              <SelectItem
                key={group.id}
                value={group.name}
              >
                {group.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
