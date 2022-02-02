import { EventEmitter } from "events"
import { Logger } from "./debug"
import { Response } from "./schemas/stream"
import WebSocket from "ws"
import { v4 } from "uuid"

export default class NcatAntenna extends EventEmitter
{
	constructor({ webSocketUrl, token, antennaId }: { webSocketUrl: string, token: string, antennaId: string })
	{
		super()

		const logger = new Logger("Server")
		const stream = new WebSocket(`${webSocketUrl}/streaming?i=${token}`)
		const id = v4()

		stream.on("open", () =>
		{
			logger.fire("info", "ストリーミングサーバーとの接続が正常に確立されました。")

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
				const data = Response.safeParse(JSON.parse(response.toString()))

				if (data.success)
				{
					const note = data.data.body.body
					this.emit("recieve", note)
				}
				else
				{
					logger.fire("warning", `レスポンスのバリデーションに失敗しました。詳細: ${data.error}`)
				}
			}
			catch (error)
			{
				logger.fire("error", `レスポンスの解析に失敗しました。詳細: ${error}`)
			}
		})
	}
}
