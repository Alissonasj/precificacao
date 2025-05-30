import { precificationsTable } from '@db_schemas/precification';

export type PrecificationInsertDatabase =
  typeof precificationsTable.$inferInsert;
export type PrecificationSelectDatabase =
  typeof precificationsTable.$inferSelect;
