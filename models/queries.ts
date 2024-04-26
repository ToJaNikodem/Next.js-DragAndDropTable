import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from './models'
import '@/envConfig'
import { asc } from 'drizzle-orm'

export const db = drizzle(sql, { schema })

export const getUserId = async (clerkId: string) => {
  const response = await db.query.users.findFirst({
    columns: {
      id: true,
    },
  })
  return response?.id
}

export const getUserTable = async (userId: number) => {
  console.log('userId: ', userId)
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
  console.log('response: ', response)
  return response
}
