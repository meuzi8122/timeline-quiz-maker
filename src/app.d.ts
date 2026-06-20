// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { authServerClient } from '$lib/infrastructures/auth/auth-client.server';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: typeof authServerClient.$Infer.Session.user | null;
			session: typeof authServerClient.$Infer.Session.session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
