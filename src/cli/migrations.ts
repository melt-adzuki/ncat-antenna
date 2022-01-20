import { Migrations } from "conf/dist/source/types"

const migrations: Migrations<Record<string, unknown>> = {
	"1.1.0": store =>
	{
		// instance -> webSocketUrl
		if (store.has("instance"))
		{
			store.set("webSocketUrl", store.get("instance"))
			store.delete("instance")
		}

		// method -> notifier
		if (store.has("method"))
		{
			store.set("notifier", store.get("method"))
			store.delete("method")
		}
	},
}

export default migrations
