/* eslint-disable sort-keys */
import { z } from "zod"

export const Emoji: z.ZodSchema<Emoji> = z.object({
	name: z.string(),
	url: z.string().url(),
})

export const Instance: z.ZodSchema<Instance> = z.object({
	name: z.string(),
	softwareName: z.string().nullable(),
	softwareVersion: z.string().nullable(),
	iconUrl: z.string(),
	faviconUrl: z.string(),
	themeColor: z.string().nullable().nullable(),
})

export const User: z.ZodSchema<User> = z.object({
	id: z.string(),
	name: z.string(),
	username: z.string(),
	host: z.string().nullable(),
	avatarUrl: z.string(),
	avatarBlurhash: z.string().nullable(),
	avatarColor: z.string().nullable(),
	isCat: z.boolean().optional(),
	instance: Instance.optional(),
	emojis: z.array(Emoji),
	onlineStatus: z.enum(["online", "active", "offline", "unknown"]),
})

export const File: z.ZodSchema<MisskeyFile> = z.object({
	id: z.string(),
	createdAt: z.string(),
	name: z.string(),
	type: z.string(),
	md5: z.string(),
	size: z.number(),
	isSensitive: z.boolean(),
	blurhash: z.string().nullable(),
	properties: z.object({
		width: z.number().optional(),
		height: z.number().optional(),
	}),
	url: z.string().url(),
	thumbnailUrl: z.string().url(),
	comment: z.unknown().nullable(), // FIXME
	folderId: z.string().nullable(),
	folder: z.unknown().nullable(), // FIXME
	userId: z.string().nullable(),
	user: User.nullable(),
})

export const Note: z.ZodSchema<Note> = z.lazy(() => z.object({
	id: z.string(),
	createdAt: z.string(),
	userId: z.string(),
	user: User,
	text: z.string().nullable(),
	cw: z.string().nullable(),
	visibility: z.enum(["public", "home", "followers", "specified"]),
	renoteCount: z.number(),
	repliesCount: z.number(),
	reactions: z.record(z.number()),
	emojis: z.array(Emoji),
	fileIds: z.array(z.string()),
	files: z.array(File),
	replyId: z.string().nullable(),
	renoteId: z.string().nullable(),
	renote: Note.optional(),
	mentions: z.array(z.string()).optional(),
	uri: z.string().url().optional(),
	reply: Note.optional(),
	myReaction: z.string().optional(),
}))
