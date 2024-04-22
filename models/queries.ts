import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as models from './models'

const db = drizzle(sql, { schema: models })

export const getUserId = async (clerkId: string) => {
  const response = await db.query.users.findFirst({
    columns: {
      id: true,
    }
  })
  return response
}

export const getUserTable = async (userId: number) => {
  const response = await db.query.tables.findFirst({
    with: {
      collumns: {
        with: {
          fields: {
            with: {
              properties: {},
            },
          },
        },
      },
    },
    where: (users, { eq }) => eq(users.id, userId),
  })
  console.log(response)
}
