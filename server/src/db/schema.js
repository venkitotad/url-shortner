import { uuid } from 'drizzle-orm/pg-core';
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

export const urlTable = pgTable('urls',{
  id: uuid().primaryKey().defaultRandom(),
  shortCode: varchar('code', {length: 50}).notNull().unique(),
  targetURL: text('target_url').notNull(), 
  userId: integer('user_id').references(() => usersTable.id).notNull(), 
  createdAt: timestamp('created-at').defaultNow().notNull(),
  updatedAt: timestamp('updated-at').$onUpdate(() => new Date())
});
