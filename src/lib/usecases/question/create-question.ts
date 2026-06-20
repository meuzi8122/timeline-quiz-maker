import type { Question } from "$lib/domains/entitite/question";
import type { QuestionRepository } from "$lib/repositories/question.server";

export async function createQuestionUsecase(
	deps: { questionRepository: QuestionRepository },
	params: {
		id: string;
		ownerId: string;
	}
) {
	await deps.questionRepository.create({
		question: {
			id: params.id,
			ownerId: params.ownerId,
			theme1: "お題1",
			theme2: "お題2",
			description: "",
			isDraft: true
		}
	});
}
