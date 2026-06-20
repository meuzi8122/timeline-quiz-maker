import { findMyQuestions } from "$lib/infrastructures/db/queries/find-my-questions.server";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, "Unauthorized");
	}

	return {
		questions: await findMyQuestions(locals.user.id)
	};
};
