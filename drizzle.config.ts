import type { Config } from 'drizzle-kit'
import '@/envConfig'

export default {
  schema: './models/models.ts',
  out: './database',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config
