import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const materialsTable = pgTable('materials', {
  id: uuid().defaultRandom().primaryKey(),
  material: text().notNull(),
  materialGroup: text('material_group').notNull(),
  price: numeric({ mode: 'number' }).notNull(),
  baseWidth: numeric('base_width', { mode: 'number' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});
