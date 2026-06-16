import { goto } from "$app/navigation";
import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({});

export async function signIn() {
	await authClient.signIn.social({
		provider: "google"
	});
}

export async function signOut() {
	await authClient.signOut();
	goto("/");
}
