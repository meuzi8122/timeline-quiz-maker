import { getQuestion } from "$lib/infrastructures/db/queries/get-question.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	return {
		question: await getQuestion({ id: params.questionId })
	};
};
