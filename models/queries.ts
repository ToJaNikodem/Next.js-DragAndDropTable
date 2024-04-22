import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as models from './models'

const db = drizzle(sql, { schema: models })

export const getUserTable = (user: any) => {
  db.query.tables.findFirst({
    with: {
      
    }
  })
}