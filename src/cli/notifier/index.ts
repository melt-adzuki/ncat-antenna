import Conf from "conf"
import Discord from "./modules/discord"
import NodeNotifier from "./modules/node-notifier"
import notifierNameList from "./name-list"
import { z } from "zod"

const notify = (title: string, text: string) =>
{
	const config = new Conf()

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const notifiers: { [K in typeof notifierNameList[number] ]: any} = {
		デスクトップ通知: NodeNotifier,
	} as const

	const currentNotifierName = z.enum(notifierNameList).parse(config.get("notifier"))

	const notifier = new notifiers[currentNotifierName](title, text)
	notifier.fire()
}

export default notify
