import { SAMPLE_OCCURRENCE_PAIRS } from "$lib/domains/entitite/occurrence-pair";
import { SAMPLE_QUESTION } from "$lib/domains/entitite/question";
import { getQuestion } from "$lib/infrastructures/db/queries/get-question.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
	params
}): Promise<{ question: Awaited<ReturnType<typeof getQuestion>> }> => {
	if (params.id === SAMPLE_QUESTION.id) {
		return {
			question: {
				...SAMPLE_QUESTION,
				occurrencePairs: SAMPLE_OCCURRENCE_PAIRS
			}
		};
	}

	return {
		question: await getQuestion({ id: params.id })
	};
};
