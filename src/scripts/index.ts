import Debug from "./debug"
import { EventEmitter } from "events"
import WebSocket from "ws"
import { v4 } from "uuid"

interface StreamResponse {
	type: "channel"
	body: {
		id: string
		type: "note"
		body: Note
	}
}

export default class NcatAntenna extends EventEmitter
{
	constructor({ webSocketUrl, token, antennaId }: { webSocketUrl: string, token: string, antennaId: string })
	{
		super()

		const stream = new WebSocket(`${webSocketUrl}/streaming?i=${token}`)
		const id = v4()

		stream.on("open", () =>
		{
			Debug.log("info", "ストリーミングサーバーとの接続が正常に確立されました。")

			stream.send(JSON.stringify({
				body: {
					channel: "antenna",
					id,
					params: { antennaId },
				},
				type: "connect",
			}))
		})

		stream.on("message", (response: MessageEvent<Buffer>) =>
		{
			try
			{
				const data = JSON.parse(response.toString()) as StreamResponse // Unsafe assertion
				const note = data.body.body

				this.emit("recieve", note)
			}
			catch (error)
			{
				Debug.log("warning", `レスポンスの解析に失敗しました。詳細: ${error}`)
			}
		})
	}
}
