import {
  materialGroupsTable,
  materialsTable
} from '@/app/(backend)/infra/schemas/material';
import * as z from 'zod';

export type MaterialInsert = typeof materialsTable.$inferInsert;
export type MaterialSelect = typeof materialsTable.$inferSelect;
export const materialFormSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório.' }),
  baseWidth: z.string().optional(),
  price: z.string().min(1, { message: 'Campo obrigatório.' }),
  fkGroup: z.string().min(1, { message: 'Campo obrigatório.' })
});
export type MaterialFormSchema = z.infer<typeof materialFormSchema>;

export type MaterialGroupInsert = typeof materialGroupsTable.$inferInsert;
export type MaterialGroupSelect = typeof materialGroupsTable.$inferSelect;
export const materialGroupFormSchema = z.object({
  group: z.string().min(1, { message: 'Campo obrigatório.' })
});
export type MaterialGroupFormSchema = z.infer<typeof materialGroupFormSchema>;
