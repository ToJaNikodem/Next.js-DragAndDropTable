CREATE TABLE IF NOT EXISTS "collumns" (
	"id" serial PRIMARY KEY NOT NULL,
	"table_id" integer,
	"collumn_name" varchar(256),
	"index" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fields" (
	"id" serial PRIMARY KEY NOT NULL,
	"collumn_id" integer,
	"field_name" varchar(256),
	"field_desc" varchar(256),
	"index" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"field_id" integer,
	"property_name" varchar(256),
	"is_active" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tables" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"table_name" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collumns" ADD CONSTRAINT "collumns_table_id_tables_id_fk" FOREIGN KEY ("table_id") REFERENCES "tables"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fields" ADD CONSTRAINT "fields_collumn_id_collumns_id_fk" FOREIGN KEY ("collumn_id") REFERENCES "collumns"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "properties" ADD CONSTRAINT "properties_field_id_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "fields"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tables" ADD CONSTRAINT "tables_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
