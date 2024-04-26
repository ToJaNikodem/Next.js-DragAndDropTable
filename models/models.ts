import { relations } from 'drizzle-orm'
import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  smallint,
  boolean,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').notNull().default(''),
})

export const tables = pgTable('tables', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  tableName: varchar('table_name', { length: 256 }),
})

export const columns = pgTable('columns', {
  id: serial('id').primaryKey(),
  tableId: integer('table_id')
    .references(() => tables.id)
    .notNull(),
  columnName: varchar('column_name', { length: 256 }),
  index: smallint('index').notNull(),
})

export const fields = pgTable('fields', {
  id: serial('id').primaryKey(),
  columnId: integer('column_id')
    .references(() => columns.id)
    .notNull(),
  fieldName: varchar('field_name', { length: 256 }),
  fieldDesc: varchar('field_desc', { length: 256 }),
  index: smallint('index').notNull(),
})

export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  fieldId: integer('field_id')
    .references(() => fields.id)
    .notNull(),
  propertyName: varchar('property_name', { length: 256 }),
  isActive: boolean('is_active').notNull().default(false),
})

export const usersRelations = relations(users, ({ many }) => ({
  tables: many(tables),
}))

export const tablesRelations = relations(tables, ({ one, many }) => ({
  user: one(users, {
    fields: [tables.userId],
    references: [users.id],
  }),
  columns: many(columns),
}))

export const columnsRelations = relations(columns, ({ one, many }) => ({
  table: one(tables, {
    fields: [columns.tableId],
    references: [tables.id],
  }),
  fields: many(fields),
}))

export const fieldsRelations = relations(fields, ({ one, many }) => ({
  column: one(columns, {
    fields: [fields.columnId],
    references: [columns.id],
  }),
  properties: many(properties),
}))

export const propertiesRelations = relations(properties, ({ one }) => ({
  field: one(fields, {
    fields: [properties.fieldId],
    references: [fields.id],
  }),
}))
