import { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET } from "$env/static/private";
import { betterAuth } from "better-auth";

export const authServerClient = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL,
	socialProviders: {
		google: {
			clientId: GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: GOOGLE_OAUTH_CLIENT_SECRET
		}
	}
});
