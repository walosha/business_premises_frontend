import { createHmac } from "crypto";

export function generateHMAC256Auth(message) {
	return createHmac("sha256", process.env.CLIENTSECRET)
		.update(message)
		.digest("base64");
}
