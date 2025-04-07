import { numeric, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const materialsTable = pgTable('materials', {
  id: uuid().defaultRandom().primaryKey(),
  material: text().notNull(),
  materialGroup: text('material_group').notNull(),
  price: numeric({ mode: 'number' }).notNull()
});
