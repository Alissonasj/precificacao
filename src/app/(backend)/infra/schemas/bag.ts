import {
  customType,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core';

const bytea = customType<{ data: Buffer; driverData: string }>({
  dataType() {
    return 'bytea';
  },
  toDriver(value: Buffer): string {
    return `\\x${value.toString('hex')}`;
  }
});

export const bagsTable = pgTable('bags', {
  id: uuid().defaultRandom().unique().notNull().primaryKey(),
  name: text('name').unique().notNull(),
  hoursWorked: numeric('hours_worked', { mode: 'number' }).notNull(),
  suggestedPrice: numeric('suggested_price', { mode: 'number' }),
  photo: bytea(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});
