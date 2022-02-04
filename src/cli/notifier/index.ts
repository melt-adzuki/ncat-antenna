import Conf from "conf"
import Discord from "./discord"
import NodeNotifier from "./node-notifier"
import { z } from "zod"

export const notifierNameList = ["デスクトップ通知"] as const

export const notify = (title: string, text: string) =>
{
	const config = new Conf()

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const notifiers: { [K in typeof notifierNameList[number] ]: any} = {
		デスクトップ通知: NodeNotifier,
	}

	const currentNotifierName = z.enum(notifierNameList).parse(config.get("notifier"))

	const notifier = new notifiers[currentNotifierName](title, text)
	notifier.notify()
}

export abstract class Notifier
{
	protected title: string
	protected text: string

	constructor(title: string, text: string)
	{
		this.title = title
		this.text = text
	}

	public abstract notify(): void
}
