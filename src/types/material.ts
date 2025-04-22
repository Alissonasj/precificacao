import { materialsTable } from '@/infra/schemas/materials';

export type MaterialInsert = typeof materialsTable.$inferInsert;
export type MaterialSelect = typeof materialsTable.$inferSelect;
