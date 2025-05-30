import { precificationsTable } from '@db_schemas/precification';

export type PrecificationInsert = typeof precificationsTable.$inferInsert;
export type PrecificationSelect = typeof precificationsTable.$inferSelect;
