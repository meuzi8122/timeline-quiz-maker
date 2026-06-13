import type { QuestionRepository } from "$lib/repositories/question.server";
import {
	dbClient,
	OCCURRENCE_PAIRS_TABLE_NAME,
	QUESTION_TABLE_NAME,
	type DbClient
} from "../client.server";

export function createQuestionRepository(db: DbClient): QuestionRepository {
	return {
		async create({ question, occurrencePairs }) {
			console.log("Creating question with data:", { question, occurrencePairs });
			try {
				await db.execute({
					query: `INSERT INTO ${QUESTION_TABLE_NAME} (id, title, theme1, theme2) VALUES (?, ?, ?, ?)`,
					values: [question.id, question.title, question.theme1, question.theme2]
				});
			} catch (error) {
				console.error("Failed to create question:", error);
				throw new Error("Failed to create question");
			}

			// TODO: values句複数指定なり、トランザクションなりでまとめて実行する
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
					console.error("Failed to create occurrence-pair:", error);
					throw new Error("Failed to create occurrence-pair");
				}
			}
		}
	};
}

export const questionRepository = createQuestionRepository(dbClient);
