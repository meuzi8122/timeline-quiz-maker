import z from "zod";

export const updateQuestionSchema = z.object({
	theme1: z.string().min(1, "お題1は必須です"),
	theme2: z.string().min(1, "お題2は必須です"),
	description: z.string(),
	occurrencePairs: z
		.string()
		.transform((text) => JSON.parse(text))
		.pipe(
			z
				.array(
					z.object({
						occurredAt: z.string().min(1, "日付は必須です"),
						occurrence1: z.string().min(1, "出来事1は必須です"),
						occurrence2: z.string().min(1, "出来事2は必須です")
					})
				)
				.min(1, "出来事を追加してください")
		)
		.superRefine((occurrencePairs, ctx) => {
			if (occurrencePairs.length !== new Set(occurrencePairs.map((pair) => pair.occurredAt)).size) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "日付が重複しています"
				});
			}
		})
});
