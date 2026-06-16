import type { QuestionRepository } from "$lib/repositories/question.server";
import {
	dbClient,
	OCCURRENCE_PAIRS_TABLE_NAME,
	QUESTION_TABLE_NAME,
	type DbClient
} from "../client.server";

export function createQuestionRepository(db: DbClient): QuestionRepository {
	return {
		async create({ question }) {
			try {
				await db.execute({
					query: `INSERT INTO ${QUESTION_TABLE_NAME} (id, theme1, theme2, description) VALUES (?, ?, ?, ?)`,
					values: [question.id, question.theme1, question.theme2, question.description]
				});
			} catch (error) {
				console.error("Failed to create question:", error);
				throw new Error("Failed to create question");
			}
		},
		async update({ question, occurrencePairs }) {
			try {
				await db.execute({
					query: `UPDATE ${QUESTION_TABLE_NAME} SET theme1 = ?, theme2 = ?, description = ? WHERE id = ?`,
					values: [question.theme1, question.theme2, question.description, question.id]
				});
			} catch (error) {
				console.error("Failed to update question:", error);
				throw new Error("Failed to update question");
			}

			if (occurrencePairs.length > 0) {
				try {
					await db.execute({
						query: `SELECT COUNT(*) AS count FROM ${OCCURRENCE_PAIRS_TABLE_NAME} WHERE question_id = ?`,
						values: [question.id]
					});
				} catch (error) {
					console.error("Failed to check existing occurrence-pairs:", error);
					throw new Error("Failed to check existing occurrence-pairs");
				}

				// TODO: トランザクションで全件成功 or 1件も登録しないを担保
				for (const occurrencePair of occurrencePairs) {
					try {
						await db.execute({
							query: `INSERT INTO ${OCCURRENCE_PAIRS_TABLE_NAME} (id, question_id, occurrence1, occurrence2) VALUES (?, ?, ?, ?)`,
							values: [
								occurrencePair.id,
								question.id,
								occurrencePair.occurrence1,
								occurrencePair.occurrence2
							]
						});
					} catch (error) {
						console.error("Failed to update occurrence-pair:", error);
						throw new Error("Failed to update occurrence-pair");
					}
				}
			}
		}
	};
}

export const questionRepository = createQuestionRepository(dbClient);
