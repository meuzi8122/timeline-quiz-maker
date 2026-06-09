import { shuffle } from "es-toolkit";

export interface OccurrencePair {
	/**
	 * yyyy/mm/ddの文字列
	 */
	date: string;
	/**
	 * タイムライン1で発生した出来事
	 */
	occurrence1: string;
	/**
	 * タイムライン2で発生した出来事
	 */
	occurrence2: string;
}

/**
 * 年代順に並んでいる出来事をシャッフルする
 */
export function shuffleOccurrences(pairs: OccurrencePair[]): {
	occurrences1: string[];
	occurrences2: string[];
} {
	const occurrences1 = shuffle(pairs.map((pair) => pair.occurrence1));
	const occurrences2 = shuffle(pairs.map((pair) => pair.occurrence2));
	return { occurrences1, occurrences2 };
}

/**
 * 回答チェック
 */
export function checkAnswers(
	occurencesPairs: OccurrencePair[],
	occurrences1: string[],
	occurrences2: string[]
): {
	correctPositionPairCount: number;
	correctPairCount: number;
} {
	let correctPositionPairCount = 0;
	let correctPairCount = 0;

	for (const [correctIndex, pair] of occurencesPairs.entries()) {
		const answerIndex1 = occurrences1.indexOf(pair.occurrence1);
		const answerIndex2 = occurrences2.indexOf(pair.occurrence2);
		// 選択された出来事のペアの年代が一致している
		if (answerIndex1 === answerIndex2) {
			correctPairCount++;
			// 実際の年代とも一致している
			if (answerIndex1 === correctIndex) {
				correctPositionPairCount++;
			}
		}
	}

	return { correctPositionPairCount, correctPairCount };
}
