import type { Config } from 'drizzle-kit'

export default {
  schema: './models/models.ts',
  out: './database',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config
