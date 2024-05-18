import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ILangState, ILangStore } from './interfaces'
import { customStorage } from '../utils/storages'

export const initialLangState: ILangState = {
	lang: 'es'
}

export const useLangStore = create(
	persist<ILangStore>(
		(set) => ({
			...initialLangState,
			changeLang: (lang) => {
				set((state) => ({ ...state, lang }))
			},
			clearState: () =>
				set((state) => ({ ...state, ...initialLangState }))
		}),
		{
			name: 'Lang-storage',
			storage: createJSONStorage(() => customStorage())
		}
	)
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('LangStore', useLangStore)
}
