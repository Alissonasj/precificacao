import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const bagsTable = pgTable('bags', {
  id: uuid().defaultRandom().unique(),
  name: text('name').primaryKey(),
  price: numeric({ mode: 'number' }),
  hoursWorked: numeric('hours_worked', { mode: 'number' }).notNull(),
  pricingDate: timestamp('pricing_date', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});
