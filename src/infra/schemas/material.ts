import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const materialsTable = pgTable('materials', {
  id: uuid().defaultRandom().primaryKey(),
  materialName: text('material_name').notNull(),
  materialGroup: text('material_group').notNull(),
  price: numeric({ mode: 'number' }).notNull(),
  baseWidth: numeric('base_width', { mode: 'number' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});
