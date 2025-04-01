import { integer, numeric, pgTable, text } from 'drizzle-orm/pg-core';

export const materialsTable = pgTable('materials', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  material: text().notNull(),
  materialGroup: text('material_group').notNull(),
  price: numeric({ mode: 'number' }).notNull()
});
