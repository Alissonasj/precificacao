import { precificationsTable } from '@db_schemas/precification';
import { z } from 'zod';

export type PrecificationInsertDatabase =
  typeof precificationsTable.$inferInsert;
export type PrecificationSelectDatabase =
  typeof precificationsTable.$inferSelect;
export const precificationFormSchema = z.object({
  materials: z.array(
    z.object({
      layer: z.string(),
      length: z.string(),
      width: z.string(),
      price: z.string(),
      calculatedValue: z.string(),
      fkMaterial: z.string().min(1, 'Escolha um material'),
      fkBag: z.string()
    })
  )
});
export type PrecificationFormData = z.infer<typeof precificationFormSchema>;
