#!/usr/bin/env node

import * as notifiers from "./notifiers"
import Conf from "conf"
import Debug from "../scripts/debug"
import NcatAntenna from "../scripts"
import initialize from "./init"

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

	const config = new Conf()

	const webSocketUrl = config.get("instance") as string
	const token = config.get("token") as string
	const antennaId = config.get("antennaId") as string

	const ncatAntenna = new NcatAntenna({ antennaId, token, webSocketUrl })

	ncatAntenna.on("recieve", (note: Note) =>
	{
		const isRenote = Boolean(note.renote)
		const title = `${isRenote ? "🔁 " : ""}${note.user.username}`
		const text = (isRenote ? note.renote?.text : note.text) || ""

		Debug.log("recieve", `${title}: ${text}`)

		switch (config.get("method"))
		{
		case "デスクトップ通知":
			notifiers.nodeNotifier({ text, title })
			break

		default:
			throw new Error("設定ファイルの値を正しく解析できませんでした。")
		}
	})
})()
