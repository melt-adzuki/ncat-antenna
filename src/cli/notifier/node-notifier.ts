import { Notifier } from "."
import notifier from "node-notifier"

export default class NodeNotifier extends Notifier
{
	constructor(
		protected readonly title: string,
		protected readonly text: string,
	)
	{
		super()
	}

	notify()
	{
		notifier.notify({
			message: this.text,
			title: this.title,
		})
	}
}
