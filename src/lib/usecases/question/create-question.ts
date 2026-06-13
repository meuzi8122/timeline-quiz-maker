import type { OccurrencePair } from "$lib/domains/entitite/occurrence-pair";
import type { Question } from "$lib/domains/entitite/question";
import type { QuestionRepository } from "$lib/repositories/question.server";

export async function createQuestionUsecase(
	deps: { questionRepository: QuestionRepository },
	params: {
		question: Omit<Question, "id">;
		occurrencePairs: Omit<OccurrencePair, "id">[];
	}
) {
	await deps.questionRepository.create({
		question: {
			...params.question,
			id: crypto.randomUUID()
		},
		occurrencePairs: params.occurrencePairs.map((pair) => ({
			...pair,
			id: crypto.randomUUID()
		}))
	});
}
