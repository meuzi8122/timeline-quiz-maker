import { questionRepository } from "$lib/infrastructures/db/repositories/question.server.js";
import { createQuestionUsecase } from "$lib/usecases/question/create-question.js";
import { json, type RequestHandler } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";

export const POST: RequestHandler = async ({ request }) => {
	const id = randomUUID();

	try {
		await createQuestionUsecase(
			{
				questionRepository
			},
			{
				id,
				ownerId: ""
			}
		);
	} catch (error) {
		console.error("Failed to create question:", error);
		return json(null, { status: 500 });
	}

	return json({ id }, { status: 201 });
};
