import { integer, pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
  createdAt: timestamp('created-at').defaultNow().notNull(),
  updatedAt: timestamp('updated-at').$onUpdate(() => new Date())
});
