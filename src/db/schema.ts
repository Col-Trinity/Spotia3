import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  index,
  primaryKey,
  json,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from '@auth/core/adapters';
import { AiResponseSchema } from "../types/ia";
import { z } from "zod";

// Users table
export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull().unique(),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    image: text('image'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    emailIdx: index('email_idx').on(table.email),
  }),
);

// Accounts table (for OAuth)
export const accounts = pgTable(
  'accounts',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (table) => ({
    compoundKey: primaryKey({ columns: [table.provider, table.providerAccountId] }),
    userIdIdx: index('accounts_user_id_idx').on(table.userId),
  }),
);

// Sessions table
export const sessions = pgTable(
  'sessions',
  {
    sessionToken: varchar('session_token', { length: 255 }).notNull().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (table) => ({
    userIdIdx: index('sessions_user_id_idx').on(table.userId),
  }),
);

// Verification tokens table
export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (table) => ({
    compoundKey: primaryKey({ columns: [table.identifier, table.token] }),
  }),
);

// Music analyses table
export const generations = pgTable(
  'generations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    generation: json().$type<z.infer<typeof AiResponseSchema>>().notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' })
  },
  (table) => ({
    userIdIdx: index('generations_user_id_idx').on(table.userId),
  })

)

export const playlistAiGenerations = pgTable(
  'playlistAiGenerations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('ai_generations_user_id_idx').on(table.userId),
  })
)

// Tabla de playlists generadas por la IA
export const playlists = pgTable(
  'playlists',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    spotifyPlaylistId: varchar('spotify_playlist_id', { length: 255 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('playlists_user_id_idx').on(table.userId),
  })
)

// Tabla de canciones
export const songs = pgTable(
  'songs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    artist: varchar('artist', { length: 255 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    spotifyTrackId: varchar('spotify_track_id', { length: 255 }), // puede ser null si no se buscó todavía
    timesUsed: integer('times_used').default(0).notNull(),
  }
)

// Tabla intermedia playlist_songs
export const playlistSongs = pgTable(
  'playlist_songs',
  {
    playlistId: uuid('playlist_id').notNull().references(() => playlists.id, { onDelete: 'cascade' }),
    songId: uuid('song_id').notNull().references(() => songs.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    compoundKey: primaryKey({ columns: [table.playlistId, table.songId] }),
  })
)

// Types
export type Playlist = typeof playlists.$inferSelect
export type NewPlaylist = typeof playlists.$inferInsert
export type Song = typeof songs.$inferSelect
export type NewSong = typeof songs.$inferInsert
export type PlaylistSong = typeof playlistSongs.$inferSelect


export type PlaylistAiGeneration = typeof playlistAiGenerations.$inferSelect;
export type NewPlaylistAiGeneration = typeof playlistAiGenerations.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type Generation = typeof generations.$inferSelect;
export type NewGeneration = typeof generations.$inferInsert;

