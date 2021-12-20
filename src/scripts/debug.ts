namespace Debug {
	const prefixes = {
		error: "[失敗]",
		info: "[情報]",
		recieve: "[受信]",
		warning: "[警告]",
	} as const

	type logType = keyof typeof prefixes

	export const log = (type: logType, message: string): void =>
	{
		console.log(`${prefixes[type]} ${message}`)
	}
}

export default Debug
