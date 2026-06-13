import type { OccurrencePair } from "$lib/domains/entitite/occurrence-pair";
import type { Question } from "$lib/domains/entitite/question";

/**
 * TODO: 今後追加・変更
 *
 * - create
 *   - 引数をidのみに変更
 *      - タイトル -> 「新規クイズ」
 *      - お題 -> 「テーマ1」「テーマ2」
 *      - 出来事 -> 未設定
 * - update
 *   - タイトル・お題・出来事を更新
 */
export interface QuestionRepository {
	create(params: { question: Question; occurrencePairs: OccurrencePair[] }): Promise<void>;
}
