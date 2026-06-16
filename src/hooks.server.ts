import { building } from "$app/environment";
import { authServerClient } from "$lib/infrastructures/auth/auth-client.server";
import { redirect, type Handle } from "@sveltejs/kit";
import { svelteKitHandler } from "better-auth/svelte-kit";

export const handle: Handle = async ({ event, resolve }) => {
	// ビルド／プリレンダリング中は認証処理を行わない
	if (building) {
		return svelteKitHandler({ event, resolve, auth: authServerClient, building });
	}

	const session = await authServerClient.api.getSession({ headers: event.request.headers });

	event.locals.session = session?.session ?? null;
	event.locals.user = session?.user ?? null;

	if (["/editor"].some((path) => event.url.pathname.startsWith(path))) {
		if (!event.locals.session || !event.locals.user) {
			return redirect(302, "/login");
		}
	}

	return svelteKitHandler({ event, resolve, auth: authServerClient, building });
};
