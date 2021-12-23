import { Migrations } from "conf/dist/source/types"

const migrations: Migrations<Record<string, unknown>> = {
	"1.1.0": store =>
	{
		store.set("webSocketUrl", store.get("instance"))
		store.delete("instance")

		store.set("notifier", store.get("method"))
		store.delete("method")
	},
}

export default migrations
