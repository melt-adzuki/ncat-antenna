import { Notifier } from "."
import notifier from "node-notifier"

export default class NodeNotifier extends Notifier
{
	constructor(title: string, text: string)
	{
		super(title, text)
	}

	fire()
	{
		notifier.notify({
			message: this.text,
			title: this.title,
		})
	}
}
