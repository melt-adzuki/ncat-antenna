import Conf from "conf"
import inquirer from "inquirer"
import notifierNameList from "./notifier/name-list"

// eslint-disable-next-line max-statements, max-lines-per-function
const initialize = async () =>
{
	const config = new Conf()
	config.clear()

	const { webSocketUrl } = await inquirer.prompt({
		choices: ["Misskey.io", "すしすきー", "その他"],
		message: "使用しているインスタンスを選択してください。",
		name: "webSocketUrl",
		type: "list",
	})

	switch (webSocketUrl)
	{
	case "Misskey.io":
		config.set("webSocketUrl", "wss://misskey.io")
		break

	case "すしすきー":
		config.set("webSocketUrl", "wss://sushi.ski")
		break

	case "その他": {
		const { customWebSocketUrl } = await inquirer.prompt({
			message: "使用しているインスタンスのWebSocketのURLを入力してください。",
			name: "customWebSocketUrl",
			type: "input",
		})
		config.set("webSocketUrl", customWebSocketUrl)
		break
	}

	default:
		throw new Error("入力された値が不正です。")
	}

	const { token } = await inquirer.prompt({
		message: "アクセストークンを入力してください。トークンは Misskey > 設定 > API > アクセストークンの発行 から発行できます。",
		name: "token",
		type: "password",
	})
	config.set("token", token)

	const { antennaId } = await inquirer.prompt({
		message: "通知するアンテナのIDを入力してください。",
		name: "antennaId",
		type: "input",
	})
	config.set("antennaId", antennaId)

	const { notifier } = await inquirer.prompt({
		choices: notifierNameList,
		message: "通知方法を選択してください。",
		name: "notifier",
		type: "list",
	})
	config.set("notifier", notifier)

	console.log("設定が完了しました。")
}

export default initialize
