import type { OccurrencePair } from "$lib/domains/entitite/occurrence-pair";
import type { Question } from "$lib/domains/entitite/question";

export interface QuestionRepository {
	create(params: { question: Question }): Promise<void>;
	update(params: { question: Question; occurrencePairs: OccurrencePair[] }): Promise<void>;
}
