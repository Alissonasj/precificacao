import { materialsTable } from '@/app/(backend)/infra/schemas/material';

export type MaterialInsert = typeof materialsTable.$inferInsert;
export type MaterialSelect = typeof materialsTable.$inferSelect;
