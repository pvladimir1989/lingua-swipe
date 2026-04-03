export type Language = 'es' | 'ru';

export interface Section {
	id: string;
	title: string;
	swipeable: boolean;
	content: SectionContent;
}

export type SectionContent =
	| { type: 'parallel'; pairs: { es: string; ru: string }[] }
	| { type: 'grammar'; explanation: string; pairs: { es: string; ru: string }[] }
	| { type: 'vocab'; words: { es: string; ru: string }[] };

export interface Lesson {
	id: string;
	title: string;
	subtitle: string;
	sections: Section[];
}
