#!/usr/bin/env node

import * as Debug from "../scripts/debug"
import * as notifiers from "./notifiers"
import Conf from "conf"
import NcatAntenna from "../scripts"
import initialize from "./init"
import migrations from "./migrations"
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

	ncatAntenna.on("recieve", (note: Note) =>
	{
		const isRenote = Boolean(note.renote)
		const title = `${isRenote ? "🔁 " : ""}${note.user.username}`
		const text = (isRenote ? note.renote?.text : note.text) || ""

		Debug.log("recieve", `${title}: ${text}`)

		switch (config.get("notifier"))
		{
		case "デスクトップ通知":
			notifiers.nodeNotifier({ text, title })
			break

		default:
			throw new Error("設定ファイルの値を正しく解析できませんでした。")
		}
	})
})()
