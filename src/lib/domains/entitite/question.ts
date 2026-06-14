export type Question = {
	id: string;
	theme1: string;
	theme2: string;
	description: string;
};

export function createTitle(question: Question): string {
	return `「${question.theme1}」と「${question.theme2}」`;
}
