import { bagsTable } from '@db_schemas/bag';
import * as z from 'zod';

export type BagInsertDatabase = typeof bagsTable.$inferInsert;
export type BagSelectDatabase = typeof bagsTable.$inferSelect;

export const bagFormSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório.' }),
  hoursWorked: z.string().min(1, { message: 'Campo obrigatório.' }),
  price: z.string()
});

export type BagFormSchema = z.infer<typeof bagFormSchema>;
