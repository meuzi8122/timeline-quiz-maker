import { shuffle } from "es-toolkit";

export interface OccurrencePair {
	id: string;
	/**
	 * yyyy/mm/の文字列
	 */
	occurredAt: string;
	/**
	 * タイムライン1で発生した出来事
	 */
	occurrence1: string;
	/**
	 * タイムライン2で発生した出来事
	 */
	occurrence2: string;
}

export const SAMPLE_OCCURRENCE_PAIRS: OccurrencePair[] = [
	{
		id: "550e8400-e29b-41d4-a716-446655440001",
		occurredAt: "2008/5",
		occurrence1: "加藤が「手頭顔寒（てづかおさむ）」になる",
		occurrence2: "トリコと小松が出会う"
	},
	{
		id: "550e8400-e29b-41d4-a716-446655440002",
		occurredAt: "2010/6",
		occurrence1: "原宿が自分の卒アルをネットに晒す",
		occurrence2: "ルフィが「仲間がいる゛よ!!!!」と言う"
	},
	{
		id: "550e8400-e29b-41d4-a716-446655440003",
		occurredAt: "2011/12",
		occurrence1: "THE・チンゲポーカーが行われる",
		occurrence2: "刃牙が勇次郎と直接対決、関節をキメる"
	},
	{
		id: "550e8400-e29b-41d4-a716-446655440004",
		occurredAt: "2012/1",
		occurrence1: "原宿がオモコロ二代目編集長に就任",
		occurrence2: "レオリオがハンター選挙で演説する"
	},
	{
		id: "550e8400-e29b-41d4-a716-446655440005",
		occurredAt: "2013/3",
		occurrence1: "原宿がハーゲンダッツのトロをかき集める",
		occurrence2: "ワシズが地獄に落ちる"
	},
	{
		id: "550e8400-e29b-41d4-a716-446655440006",
		occurredAt: "2014/8",
		occurrence1: "ARuFaがシャワーを美少女にする",
		occurrence2: "烏野高校男子バレー部の全国出場が決定"
	},
	{
		id: "550e8400-e29b-41d4-a716-446655440007",
		occurredAt: "2015/12",
		occurrence1: "ギャラクシーの睾丸が1コになる",
		occurrence2: "鎧の巨人の両眼に「雷槍」が刺さる"
	},
	{
		id: "550e8400-e29b-41d4-a716-446655440008",
		occurredAt: "2016/1",
		occurrence1: "OLの永田がチェジュ島で傷心旅行",
		occurrence2: "暗黒大陸行きの船が出発する"
	},
	{
		id: "550e8400-e29b-41d4-a716-446655440009",
		occurredAt: "2017/6",
		occurrence1: "キショ松容疑者が逮捕",
		occurrence2: "炭治郎が「煉獄さんは負けてない！」と言う"
	},
	{
		id: "550e8400-e29b-41d4-a716-446655440010",
		occurredAt: "2018/10",
		occurrence1: "ARuFaがケツを展示",
		occurrence2: "二代目野見宿禰がボルダリングする"
	}
];

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
	correctPairCount: number;
	correctPositionPairIndexes: Set<number>;
} {
	let correctPairCount = 0;
	let correctPositionPairIndexes = new Set<number>();

	for (const [correctIndex, pair] of occurencesPairs.entries()) {
		const answerIndex1 = occurrences1.indexOf(pair.occurrence1);
		const answerIndex2 = occurrences2.indexOf(pair.occurrence2);
		// 選択された出来事のペアの年代が一致している
		if (answerIndex1 === answerIndex2) {
			correctPairCount++;
			// 実際の年代とも一致している
			if (answerIndex1 === correctIndex) {
				correctPositionPairIndexes.add(correctIndex);
			}
		}
	}

	return { correctPairCount, correctPositionPairIndexes };
}
