import type { OccurrencePair } from "$lib/domains/entitite/occurrence-pair";
import type { Question } from "$lib/domains/entitite/question";
import type { QuestionRepository } from "$lib/repositories/question.server";

export async function updateQuestionUsecase(
	deps: { questionRepository: QuestionRepository },
	params: {
		question: Question;
		occurrencePairs: Omit<OccurrencePair, "id">[];
	}
) {
	await deps.questionRepository.update({
		question: params.question,
		occurrencePairs: params.occurrencePairs.map((pair) => ({
			...pair,
			id: crypto.randomUUID()
		}))
	});
}
