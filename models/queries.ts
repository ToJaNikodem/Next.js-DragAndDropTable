import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from './models'
import '@/envConfig'
import { eq } from 'drizzle-orm'

export const db = drizzle(sql, { schema })

export interface UserTable {
  tableName: string | null
  columns: Column[]
}

export interface Column {
  columnName: string | null
  index: number
  fields: Field[]
}

export interface Field {
  index: number
  fieldName: string | null
  fieldDesc: string | null
  properties: Properties[]
}

export interface Properties {
  propertyName: string
  isActive: boolean
}

export const getUserId = async (clerkId: string): Promise<number | null> => {
  const response = await db.query.users.findFirst({
    where: eq(schema.users.clerkId, clerkId),
    columns: {
      id: true,
    },
  })
  if (response) return response.id
  return null
}

export const getUserTable = async (
  userId: number
): Promise<UserTable | null> => {
  const response = await db.query.tables.findFirst({
    columns: {
      tableName: true,
    },
    with: {
      columns: {
        orderBy: (columns, { asc }) => [asc(schema.columns.index)],
        columns: {
          columnName: true,
          index: true,
        },
        with: {
          fields: {
            orderBy: (fields, { asc }) => [asc(schema.fields.index)],
            columns: {
              fieldName: true,
              fieldDesc: true,
              index: true,
            },
            with: {
              properties: {
                columns: {
                  propertyName: true,
                  isActive: true,
                },
              },
            },
          },
        },
      },
    },
    where: (users, { eq }) => eq(users.id, userId),
  })
  if (response) return response
  return null
}
