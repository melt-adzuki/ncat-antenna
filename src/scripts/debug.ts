const prefixes = {
	error: "[失敗]",
	info: "[情報]",
	recieve: "[受信]",
	warning: "[警告]",
} as const

type LogType = keyof typeof prefixes

export class Logger
{
	constructor(private from: string)
	{ }

	public fire(type: LogType, message: string): void
	{
		console.log(`${prefixes[type]}${this.from ? ` ${this.from}: ` : ""} ${message}`)
	}
}
