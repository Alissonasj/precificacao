import { materialsTable } from '@/infra/schemas/material';

export type MaterialInsert = typeof materialsTable.$inferInsert;
export type MaterialSelect = typeof materialsTable.$inferSelect;
