import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const precificationsTable = pgTable('bags_materials', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  fkBag: text('fk_bag').notNull(),
  fkMaterial: text('fk_material').notNull(),
  width: numeric('width', { mode: 'number' }),
  length: numeric('length', { mode: 'number' }),
  layers: numeric('layers', { mode: 'number' }),
  unity: numeric('unity', { mode: 'number' }),
  calculatedPrice: numeric('calculated_price', { mode: 'number' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});
