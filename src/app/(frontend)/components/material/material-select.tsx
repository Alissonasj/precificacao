import { MaterialSelectDb } from '@/types/material';
import { FormControl } from '@ui/shadcn/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@ui/shadcn/select';

type MaterialSelectProps = {
  onValueChange: (value: string) => void;
  defaultValue: string;
  materialOptions: MaterialSelectDb[];
};

export default function MaterialSelect({
  onValueChange,
  defaultValue,
  materialOptions
}: MaterialSelectProps) {
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
