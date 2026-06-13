import { dev } from "$app/environment";
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "$env/static/private";
import { createClient, type Client, type Row } from "@libsql/client";

export interface DbClient {
	execute: (params: { query: string; values?: any[] }) => Promise<Row[]>;
}

function createDbClient(client: Client): DbClient {
	return {
		execute: async ({ query, values }) => {
			const result = await client.execute(query, values);
			return result.rows;
		}
	};
}

// 開発サーバーで動作している間はdev=Trueになる（bun run devなど）
export const dbClient = createDbClient(
	createClient(
		dev
			? {
					url: "file:timeline-quiz-maker.db"
				}
			: {
					url: DATABASE_URL,
					authToken: DATABASE_AUTH_TOKEN
				}
	)
);

export const QUESTION_TABLE_NAME = "question";
export const OCCURRENCE_PAIRS_TABLE_NAME = "occurrence_pair";
