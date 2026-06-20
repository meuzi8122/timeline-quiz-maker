export type Question = {
	id: string;
	theme1: string;
	theme2: string;
	description: string;
	ownerId: string;
};

export const SAMPLE_QUESTION: Question = {
	id: "30a9469f-cbea-45e9-84ec-439db0e39959",
	theme1: "オモコロ",
	theme2: "マンガ",
	description: "同時期に起こったオモコロと漫画の出来事を当てるクイズです。",
	ownerId: "no-user"
};

export function createTitle(question: Question): string {
	return `「${question.theme1}」と「${question.theme2}」`;
}
