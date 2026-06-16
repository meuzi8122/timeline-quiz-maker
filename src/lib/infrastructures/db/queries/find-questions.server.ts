import type { Question } from "$lib/domains/entitite/question";
import { dbClient, QUESTION_TABLE_NAME } from "../client.server";

export async function findQuestions(): Promise<Question[]> {
	const rows = await dbClient.execute({
		query: `SELECT * FROM ${QUESTION_TABLE_NAME}`
	});
	return rows.map((row) => ({
		id: row.id?.toString() ?? "",
		ownerId: row.owner_id?.toString() ?? "",
		theme1: row.theme1?.toString() ?? "",
		theme2: row.theme2?.toString() ?? "",
		description: row.description?.toString() ?? ""
	}));
}
