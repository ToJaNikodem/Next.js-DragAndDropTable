ALTER TABLE "collumns" RENAME TO "columns";--> statement-breakpoint
ALTER TABLE "fields" RENAME COLUMN "collumn_id" TO "column_id";--> statement-breakpoint
ALTER TABLE "columns" RENAME COLUMN "collumn_name" TO "column_name";--> statement-breakpoint
ALTER TABLE "fields" DROP CONSTRAINT "fields_collumn_id_collumns_id_fk";
--> statement-breakpoint
ALTER TABLE "columns" DROP CONSTRAINT "collumns_table_id_tables_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fields" ADD CONSTRAINT "fields_column_id_columns_id_fk" FOREIGN KEY ("column_id") REFERENCES "columns"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "columns" ADD CONSTRAINT "columns_table_id_tables_id_fk" FOREIGN KEY ("table_id") REFERENCES "tables"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
