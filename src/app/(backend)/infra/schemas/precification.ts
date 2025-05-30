import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { bagsTable } from './bag';
import { materialsTable } from './material';

export const precificationsTable = pgTable('bags_materials', {
  id: uuid().defaultRandom().primaryKey(),
  layer: text('layer'),
  price: numeric('price', { mode: 'number' }).notNull(),
  width: numeric('width', { mode: 'number' }),
  length: numeric('length', { mode: 'number' }),
  calculatedValue: numeric('calculated_value', { mode: 'number' }),
  fkBag: uuid('fk_bag')
    .references(() => bagsTable.id)
    .notNull(),
  fkMaterial: uuid('fk_material')
    .references(() => materialsTable.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});
