import {
  pgTable,
  serial,
  text,
} from 'drizzle-orm/pg-core'

export const Users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').notNull().default(''),
})
