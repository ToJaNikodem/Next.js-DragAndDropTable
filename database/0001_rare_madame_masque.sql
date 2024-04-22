DROP INDEX IF EXISTS "unique_idx";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "clerk_id" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "image";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "createdAt";