ALTER TABLE "collumns" ALTER COLUMN "table_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fields" ALTER COLUMN "collumn_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "field_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tables" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "collumns" ADD CONSTRAINT "collumns_index_unique" UNIQUE("index");--> statement-breakpoint
ALTER TABLE "fields" ADD CONSTRAINT "fields_index_unique" UNIQUE("index");