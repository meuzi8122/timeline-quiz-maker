import { findQuestions } from "$lib/infrastructures/db/queries/find-questions.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	return {
		questions: await findQuestions()
	};
};
