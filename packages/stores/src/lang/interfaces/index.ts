
export interface ILangStore extends ILangState, ILangActions {}

export interface ILangState {
	lang: 'en' | 'es'
}

export interface ILangActions {
	changeLang: (lang: 'en' | 'es') => void
	clearState: () => void
}
