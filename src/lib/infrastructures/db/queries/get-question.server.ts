import type { OccurrencePair } from "$lib/domains/entitite/occurrence-pair";
import type { Question } from "$lib/domains/entitite/question";
import { dbClient, QUESTION_TABLE_NAME } from "../client.server";

type GetQuestionResponse = Question & {
	occurrencePairs: OccurrencePair[];
};

export async function getQuestion(params: { id: string }): Promise<GetQuestionResponse> {
	const questionRows = await dbClient.execute({
		query: `SELECT * FROM ${QUESTION_TABLE_NAME} WHERE id = ?`,
		values: [params.id]
	});
	if (questionRows.length === 0) throw new Error("Question not found");

	const occurrencePairsRows = await dbClient.execute({
		query: `SELECT * FROM occurrence_pair WHERE question_id = ?`,
		values: [params.id]
	});
	console.log("occurrencePairsRows", questionRows);

	return {
		id: questionRows[0].id?.toString() ?? "",
		title: questionRows[0].title?.toString() ?? "",
		theme1: questionRows[0].theme1?.toString() ?? "",
		theme2: questionRows[0].theme2?.toString() ?? "",
		occurrencePairs: occurrencePairsRows.map((row) => ({
			id: row.id?.toString() ?? "",
			occurredAt: row.occurred_at?.toString() ?? "",
			occurrence1: row.occurrence1?.toString() ?? "",
			occurrence2: row.occurrence2?.toString() ?? ""
		}))
	};
}
