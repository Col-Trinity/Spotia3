DROP INDEX "ai_generations_user_id_idx";--> statement-breakpoint
ALTER TABLE "playlistGenerations" ADD COLUMN "prompt" text NOT NULL;--> statement-breakpoint
ALTER TABLE "playlistGenerations" ADD COLUMN "playlist_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "playlistGenerations" ADD COLUMN "songs" json NOT NULL;--> statement-breakpoint
ALTER TABLE "playlistGenerations" ADD COLUMN "spotify_playlist_id" varchar(255);--> statement-breakpoint
CREATE INDEX "playlist_generations_user_id_idx" ON "playlistGenerations" USING btree ("user_id");