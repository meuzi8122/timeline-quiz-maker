import { authServerClient } from "$lib/infrastructures/auth/auth-client.server";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ request }) => authServerClient.handler(request);
export const POST: RequestHandler = ({ request }) => authServerClient.handler(request);
