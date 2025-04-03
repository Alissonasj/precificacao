import { materialsTable } from '@/infra/database/schemas/materials';

export type MaterialInsert = typeof materialsTable.$inferInsert;
export type MaterialSelect = typeof materialsTable.$inferSelect;
