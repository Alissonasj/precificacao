import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compareObjectsByKeys<T>(
  object1: T,
  object2: T,
  keysToCompare: readonly (keyof T)[]
): boolean {
  return keysToCompare.every((key) => object1[key] === object2[key]);
}

type serverObjectProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  action: string;
  message: string;
};

export function serverObject(
  isOk: boolean,
  { data, action, message }: serverObjectProps
) {
  if (!isOk) {
    return {
      success: false,
      action: data.action,
      message: data.message
    };
  } else {
    return {
      success: true,
      action,
      message
    };
  }
}
