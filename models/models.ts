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

export const collumns = pgTable('collumns', {
  id: serial('id').primaryKey(),
  tableId: integer('table_id')
    .references(() => tables.id)
    .notNull(),
  collumnName: varchar('collumn_name', { length: 256 }),
  index: smallint('index').notNull().unique(),
})

export const fields = pgTable('fields', {
  id: serial('id').primaryKey(),
  collumnId: integer('collumn_id')
    .references(() => collumns.id)
    .notNull(),
  fieldName: varchar('field_name', { length: 256 }),
  fieldDesc: varchar('field_desc', { length: 256 }),
  index: smallint('index').notNull().unique(),
})

export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  fieldId: integer('field_id')
    .references(() => fields.id)
    .notNull(),
  propertyName: varchar('property_name', { length: 256 }),
  isActive: boolean('is_active').notNull().default(false),
})

export const usersRelations = relations(users, ({ many }) => {
  return {
    tables: many(tables),
  }
})

export const tablesRelations = relations(tables, ({ one, many }) => {
  return {
    user: one(users),
    collumns: many(collumns),
  }
})

export const collumnsRelations = relations(collumns, ({ one, many }) => {
  return {
    table: one(tables),
    fields: many(fields),
  }
})

export const fieldsRelations = relations(fields, ({ one, many }) => {
  return {
    collumn: one(collumns),
    properties: many(properties),
  }
})

export const propertiesRelations = relations(properties, ({ one }) => {
  return {
    field: one(fields),
  }
})
