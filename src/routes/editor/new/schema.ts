import z from "zod";

export const newQuestionSchema = z.object({
	title: z.string().min(1, "タイトルは必須です"),
	theme1: z.string().min(1, "お題1は必須です"),
	theme2: z.string().min(1, "お題2は必須です"),
	occurrencePairs: z
		.string()
		.transform((text) => JSON.parse(text))
		.pipe(
			z
				.array(
					z.object({
						date: z.string().min(1, "日付は必須です"),
						occurrence1: z.string().min(1, "出来事1は必須です"),
						occurrence2: z.string().min(1, "出来事2は必須です")
					})
				)
				.min(1, "出来事を追加してください")
		)
});
