import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const bagsTable = pgTable('bags', {
  id: uuid().defaultRandom().unique(),
  name: text('name').primaryKey(),
  suggestedPrice: numeric('suggested_price', { mode: 'number' }),
  hoursWorked: numeric('hours_worked', { mode: 'number' }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});
