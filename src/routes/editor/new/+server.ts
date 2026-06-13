import { questionRepository } from "$lib/infrastructures/db/repositories/question.server";
import { createQuestionUsecase } from "$lib/usecases/question/create-question";
import { newQuestionSchema } from "./schema";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const submission = newQuestionSchema.safeParse(Object.fromEntries(formData.entries()));

	if (!submission.success) {
		console.error("Validation failed:", submission.error.flatten().fieldErrors);
		return json({
			errors: submission.error.flatten().fieldErrors,
			status: 400
		});
	}

	try {
		await createQuestionUsecase(
			{
				questionRepository
			},
			{
				question: {
					title: submission.data.title,
					theme1: submission.data.theme1,
					theme2: submission.data.theme2
				},
				occurrencePairs: submission.data.occurrencePairs
			}
		);
	} catch (error) {
		console.error("Failed to create question:", error);
		return json({ status: 500 });
	}

	return json({ status: 200 });
};
