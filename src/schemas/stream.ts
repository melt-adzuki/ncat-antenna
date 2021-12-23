/* eslint-disable sort-keys */
import { Note } from "./entities"
import { z } from "zod"

export const Response = z.object({
	type: z.literal("channel"),
	body: z.object({
		id: z.string().uuid(),
		type: z.literal("note"),
		body: Note,
	}),
})
