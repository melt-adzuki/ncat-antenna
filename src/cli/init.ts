import Conf from "conf"
import inquirer from "inquirer"

// eslint-disable-next-line max-statements, max-lines-per-function
const initialize = async () =>
{
	const config = new Conf()
	config.clear()

	const { instance } = await inquirer.prompt({
		choices: ["Misskey.io", "すしすきー", "その他"],
		message: "使用しているインスタンスを選択してください。",
		name: "instance",
		type: "list",
	})

	switch (instance)
	{
	case "Misskey.io":
		config.set("instance", "wss://misskey.io")
		break

	case "すしすきー":
		config.set("instance", "wss://sushi.ski")
		break

	case "その他": {
		const { instanceUrl } = await inquirer.prompt({
			message: "使用しているインスタンスのWebSocketのURLを入力してください。",
			name: "instanceUrl",
			type: "input",
		})
		config.set("instance", instanceUrl)
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

	const { method } = await inquirer.prompt({
		choices: ["デスクトップ通知"],
		message: "通知方法を選択してください。",
		name: "method",
		type: "list",
	})
	config.set("method", method)

	console.log("設定が完了しました。")
}

export default initialize
