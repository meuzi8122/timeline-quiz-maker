import { checkAnswers } from "./occurrence-pair";
import { describe, it, expect } from "vitest";

describe("OccurrencePair", () => {
	it("checkAnswers", () => {
		const { correctPairCount, correctPositionPairIndexes } = checkAnswers(
			[
				{
					id: "30a9469f-cbea-45e9-84ec-439db0e39950",
					occurredAt: "2000/01",
					occurrence1: "A",
					occurrence2: "a"
				},
				{
					id: "30a9469f-cbea-45e9-84ec-439db0e39951",
					occurredAt: "2000/02",
					occurrence1: "B",
					occurrence2: "b"
				},
				{
					id: "30a9469f-cbea-45e9-84ec-439db0e39952",
					occurredAt: "2000/03",
					occurrence1: "C",
					occurrence2: "c"
				},
				{
					id: "30a9469f-cbea-45e9-84ec-439db0e39952",
					occurredAt: "2000/04",
					occurrence1: "D",
					occurrence2: "d"
				}
			],
			["A", "B", "D", "C"],
			["c", "b", "d", "a"]
		);
		// (B, b)と(D, d)というペアが作れている
		expect(correctPairCount).toBe(2);
		// (B, b)は2番目（index=1）の回答で合っているが、(D, d)は3番目（index=2）ではなく4番目（index=3）が正解。
		expect(correctPositionPairIndexes).toEqual(new Set([1]));
	});
});
