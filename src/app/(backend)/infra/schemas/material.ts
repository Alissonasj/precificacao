import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const materialsTable = pgTable('materials', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text().unique().notNull(),
  price: numeric({ mode: 'number' }).notNull(),
  fkGroup: text('fk_group').notNull(),
  calculationType: text('calculation_type').notNull(),
  baseWidth: numeric('base_width', { mode: 'number' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const materialGroupsTable = pgTable('material_groups', {
  id: uuid().defaultRandom().unique(),
  name: text().notNull().primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});
