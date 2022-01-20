import Conf from "conf"
import nodeNotifier from "./node-notifier"

const config = new Conf()

const notify = ({ text, title }: NotifierData) =>
{
	switch (config.get("notifier"))
	{
	case "デスクトップ通知":
		nodeNotifier({ text, title })
		break

	default:
		throw new Error("設定ファイルの値を正しく解析できませんでした。")
	}
}

export default notify
