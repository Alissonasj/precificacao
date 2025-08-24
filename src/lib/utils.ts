import { clsx, type ClassValue } from 'clsx';
import { ExternalToast, toast } from 'sonner';
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

type serverObjectReturnProps<T> = {
  name?: string;
  message?: string;
  action?: string;
  status_code?: number;
  success?: boolean;
  dataObject?: T;
};

export function serverObjectReturn<T>(attributes: serverObjectReturnProps<T>) {
  return {
    name: attributes?.name || '',
    message: attributes?.message || '',
    action: attributes?.action || '',
    status_code: attributes?.status_code || 200,
    success: attributes?.success ?? true,
    data: attributes?.dataObject
  };
}

export function standardToast(message: string, data?: ExternalToast) {
  toast(message, {
    ...data,
    position: 'top-center',
    closeButton: true
  });
}
