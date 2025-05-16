import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const materialsTable = pgTable('materials', {
  id: uuid().defaultRandom().primaryKey(),
  name: text('name').notNull(),
  price: numeric({ mode: 'number' }).notNull(),
  baseWidth: numeric('base_width', { mode: 'number' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  fkGroup: text('fk_group')
    .references(() => materialGroupsTable.group)
    .notNull()
});

export const materialGroupsTable = pgTable('material_groups', {
  id: uuid().defaultRandom().unique(),
  group: text('group').notNull().primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});
