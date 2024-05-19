import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import Language from '../language'
import { useTranslation } from 'react-i18next'

jest.mock('expo-router')

jest.mock('@sportapp/stores', () => ({
	useUserStore: jest.fn()
}))

describe('Language', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		jest.clearAllMocks()
		component = renderer.create(<Language />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render 2 language options', () => {
		const languages = component.root.findAllByProps({ testID: 'language' })
		expect(languages).toHaveLength(4) // react native makes it two per instance
	})

	it('should render active language', () => {
		const languages = component.root.findAllByProps({ testID: 'language' })
		expect(languages[0].props.children[0].props.status).toBe('unchecked')
		expect(languages[2].props.children[0].props.status).toBe('checked')

		const { i18n } = useTranslation()
		i18n.changeLanguage('es')

		act(() => {
			component.update(<Language />)
		})

		const languagesUpdated = component.root.findAllByProps({
			testID: 'language'
		})
		expect(languagesUpdated[0].props.children[0].props.status).toBe(
			'checked'
		)
		expect(languagesUpdated[2].props.children[0].props.status).toBe(
			'unchecked'
		)
		i18n.changeLanguage('en')
	})

	it('should update language when a language text is pressed', async () => {
		const languages = component.root.findAllByProps({ testID: 'language' })
		await act(async () => {
			languages[0].props.children[1].props.onPress()
		})
		const { i18n } = useTranslation()
		expect(i18n.language).toBe('es')

		act(() => {
			languages[2].props.children[1].props.onPress()
		})
		const { i18n: i18nUpdated } = useTranslation()

		expect(i18nUpdated.language).toBe('en')
	})

	it('should update language when a radio button group changes', async () => {
		const radioGroup = component.root.findByProps({
			'data-testID': 'radio-group'
		})
		await act(async () => {
			radioGroup.props.onValueChange('es')
		})
		const { i18n } = useTranslation()
		expect(i18n.language).toBe('es')

		act(() => {
			radioGroup.props.onValueChange('en')
		})
		const { i18n: i18nUpdated } = useTranslation()

		expect(i18nUpdated.language).toBe('en')
	})
})
