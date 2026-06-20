import { questionRepository } from "$lib/infrastructures/db/repositories/question.server";
import { updateQuestionUsecase } from "$lib/usecases/question/update-question";
import { updateQuestionSchema } from "./schema";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, params, locals }) => {
	if (!locals.user) {
		return json(null, { status: 401 });
	}

	const formData = await request.formData();
	const submission = updateQuestionSchema.safeParse(Object.fromEntries(formData.entries()));

	if (!submission.success) {
		console.error("Validation failed:", submission.error.flatten().fieldErrors);
		return json(
			{
				errors: submission.error.flatten().fieldErrors
			},
			{ status: 400 }
		);
	}

	try {
		await updateQuestionUsecase(
			{
				questionRepository
			},
			{
				question: {
					id: params.questionId as string,
					theme1: submission.data.theme1,
					theme2: submission.data.theme2,
					description: submission.data.description,
					isDraft: submission.data.isDraft,
					ownerId: locals.user.id
				},
				occurrencePairs: submission.data.occurrencePairs
			}
		);
	} catch (error) {
		console.error("Failed to create question:", error);
		return json(null, { status: 500 });
	}

	return json(null, { status: 200 });
};
