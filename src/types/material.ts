import {
  materialGroupsTable,
  materialsTable
} from '@/app/(backend)/infra/schemas/material';
import * as z from 'zod';

export type MaterialInsertDatabase = typeof materialsTable.$inferInsert;
export type MaterialSelectDatabase = typeof materialsTable.$inferSelect;
export const materialFormSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório.' }),
  baseWidth: z.string().optional(),
  price: z.string().min(1, { message: 'Campo obrigatório.' }),
  fkGroup: z.string().min(1, { message: 'Campo obrigatório.' }),
  calculationType: z.string().min(1, { message: 'Campo obrigatório.' })
});
export type MaterialFormData = z.infer<typeof materialFormSchema>;

export type MaterialGroupInsertDatabase =
  typeof materialGroupsTable.$inferInsert;
export type MaterialGroupSelectDatabase =
  typeof materialGroupsTable.$inferSelect;
export const materialGroupFormSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório.' })
});
export type MaterialGroupFormData = z.infer<typeof materialGroupFormSchema>;
