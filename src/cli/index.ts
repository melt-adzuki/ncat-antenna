#!/usr/bin/env node

import Conf from "conf"
import { Logger } from "../scripts/debug"
import NcatAntenna from "../scripts"
import initialize from "./init"
import migrations from "./migrations"
import { notify } from "./notifier"
import { z } from "zod"

(async () =>
{
	switch (process.argv[2])
	{
	case "--init":
		await initialize()
		return

	case "--help":
		console.log("使い方については、このパッケージのREADMEを確認してください。")
		return

	default:
		break
	}

	const config = new Conf({ migrations })

	const webSocketUrl = z.string().parse(config.get("webSocketUrl"))
	const token = z.string().parse(config.get("token"))
	const antennaId = z.string().parse(config.get("antennaId"))

	const ncatAntenna = new NcatAntenna({ antennaId, token, webSocketUrl })
	const logger = new Logger("Client")

	ncatAntenna.on("recieve", (note: Note) =>
	{
		const isRenote = Boolean(note.renote)
		const title = `${isRenote ? "🔁 " : ""}${note.user.name || note.user.username}`
		const text = (isRenote ? note.renote?.text : note.text) || ""

		logger.fire("recieve", `${title}: ${text}`)

		notify(text, title)
	})
})()
