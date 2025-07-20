import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const precificationsTable = pgTable('bags_materials', {
  id: uuid().defaultRandom().primaryKey(),
  layer: text('layer'),
  price: numeric('price', { mode: 'number' }),
  unity: numeric('unity', { mode: 'number' }),
  width: numeric('width', { mode: 'number' }),
  length: numeric('length', { mode: 'number' }),
  calculatedValue: numeric('calculated_value', { mode: 'number' }),
  fkBag: text('fk_bag').notNull(),
  fkMaterial: text('fk_material').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});
