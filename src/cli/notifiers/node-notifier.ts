import notifier from "node-notifier"

const nodeNotifier: Notifier = ({ title, text }: NotifierData) =>
{
	notifier.notify({
		message: text,
		title,
	})
}

export default nodeNotifier
