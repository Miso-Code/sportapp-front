import { FormDataRequired as NutritionalFormData } from '@/containers/NutritionalDataForm/utils/schema'
import { FormData as PersonalFormData } from '@/containers/PersonalDataForm/utils/schema'
import { FormDataRequired as SportFormData } from '@/containers/SportDataForm/utils/schema'
import { RenderResult, render } from '@testing-library/react'
import Home from 'pages/Home'
import { ReactNode, useState } from 'react'

jest.mock(
	'@/containers/NutritionalDataForm',
	() =>
		({
			customSubmit,
			handleCustomSubmit,
			inputsDisabled
		}: {
			customSubmit: ReactNode
			handleCustomSubmit: (data: NutritionalFormData) => void
			inputsDisabled: boolean
		}) => (
			<div className='mocked-nutritional-data-form'>
				{customSubmit}
				{inputsDisabled}
				<button
					onClick={() => {
						const payload: NutritionalFormData = {
							allergyType: ['test'],
							foodPreferences: 'test'
						}

						handleCustomSubmit(payload)
					}}>
					NutritionalDataForm
				</button>
			</div>
		)
)

jest.mock('@sportapp/stores/src/user', () => ({
	useUserStore: jest.fn().mockReturnValue({
		getProfile: jest.fn(),
		updateProfile: jest.fn(),
		user: {}
	})
}))

jest.mock(
	'@/containers/PersonalDataForm',
	() =>
		({
			customSubmit,
			handleCustomSubmit,
			inputsDisabled
		}: {
			customSubmit: ReactNode
			handleCustomSubmit: (data: PersonalFormData) => void
			inputsDisabled: boolean
		}) => (
			<div className='mocked-personal-data-form'>
				{customSubmit}
				{inputsDisabled}
				<button
					onClick={() => {
						const payload: PersonalFormData = {
							birthday: '2021-01-01',
							documentNumber: '123456789',
							documentType: 'RG',
							email: 'test@test.com',
							gender: 'M',
							name: 'Test',
							lastName: 'Test',
							password: '123456',
							nationality: {
								country: 'Brazil',
								city: 'São Paulo'
							},
							residence: {
								country: 'Brazil',
								city: 'São Paulo',
								lengthOfStay: '1'
							}
						}
						handleCustomSubmit(payload)
					}}>
					PersonalFormDataButton
				</button>
			</div>
		)
)

jest.mock(
	'@/containers/SportDataForm',
	() =>
		({
			customSubmit,
			handleCustomSubmit,
			inputsDisabled
		}: {
			customSubmit: ReactNode
			handleCustomSubmit: (data: SportFormData) => void
			inputsDisabled: boolean
		}) => (
			<div className='mocked-sport-data-form'>
				{customSubmit}
				{inputsDisabled}
				<button
					onClick={() => {
						const payload: SportFormData = {
							availableTrainingHoursPerWeek: 1,
							favouriteSportId: 1,
							height: 1,
							weight: 1,
							limitations: ['test'],
							trainingFrequency: '1',
							trainingObjective: '1'
						}
						handleCustomSubmit(payload)
					}}>
					SportFormDataButton
				</button>
			</div>
		)
)

jest.mock('react', () => {
	const ActualReact = jest.requireActual('react')

	return {
		...ActualReact,
		useState: jest.fn().mockReturnValue([-1, jest.fn()])
	}
})

describe('Home', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<Home />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should render PersonalDataForm', () => {
		;(useState as jest.Mock).mockReturnValueOnce([0, jest.fn()])
		wrapper.rerender(<Home />)
		expect(wrapper.getByText('PersonalFormDataButton')).toBeInTheDocument()
	})

	it('should render SportDataForm', () => {
		;(useState as jest.Mock).mockReturnValueOnce([1, jest.fn()])
		wrapper.rerender(<Home />)
		expect(wrapper.getByText('SportFormDataButton')).toBeInTheDocument()
	})

	it('should render NutritionalDataForm', () => {
		;(useState as jest.Mock).mockReturnValueOnce([2, jest.fn()])
		wrapper.rerender(<Home />)
		expect(wrapper.getByText('NutritionalDataForm')).toBeInTheDocument()
	})

	it('should handle PersonalDataForm submit', () => {
		;(useState as jest.Mock).mockReturnValueOnce([0, jest.fn()])
		;(useState as jest.Mock).mockReturnValueOnce([
			[true, true, true, true],
			jest.fn()
		])

		wrapper.rerender(<Home />)
		wrapper.getByText('PersonalFormDataButton').click()
		expect(wrapper.getByText('PersonalFormDataButton')).toBeInTheDocument()
	})

	it('should handle SportDataForm submit', () => {
		;(useState as jest.Mock).mockReturnValueOnce([1, jest.fn()])
		;(useState as jest.Mock).mockReturnValueOnce([
			[true, true, true, true],
			jest.fn()
		])

		wrapper.rerender(<Home />)
		wrapper.getByText('SportFormDataButton').click()
		expect(wrapper.getByText('SportFormDataButton')).toBeInTheDocument()
	})

	it('should handle NutritionalDataForm submit', () => {
		;(useState as jest.Mock).mockReturnValueOnce([2, jest.fn()])
		;(useState as jest.Mock).mockReturnValueOnce([
			[true, true, true, true],
			jest.fn()
		])

		wrapper.rerender(<Home />)
		wrapper.getByText('NutritionalDataForm').click()
		expect(wrapper.getByText('NutritionalDataForm')).toBeInTheDocument()
	})

	it('should handle edit', () => {
		const handleEdit = jest.fn()
		;(useState as jest.Mock).mockReturnValueOnce([0, jest.fn()])
		;(useState as jest.Mock).mockReturnValueOnce([
			[true, true, true, true],
			jest.fn()
		])
		;(useState as jest.Mock).mockReturnValue([
			[true, true, true, true],
			handleEdit
		])

		wrapper.rerender(<Home />)
		wrapper.getByText('personalDataForm.edit').click()
		expect(handleEdit).toHaveBeenCalled()
	})

	it('should handle edit', () => {
		const handleEdit = jest.fn()
		;(useState as jest.Mock).mockReturnValueOnce([1, jest.fn()])
		;(useState as jest.Mock).mockReturnValueOnce([
			[true, true, true, true],
			jest.fn()
		])
		;(useState as jest.Mock).mockReturnValue([
			[true, true, true, true],
			handleEdit
		])

		wrapper.rerender(<Home />)
		wrapper.getByText('sportDataForm.edit').click()
		expect(handleEdit).toHaveBeenCalled()
	})

	it('should handle edit', () => {
		const handleEdit = jest.fn()
		;(useState as jest.Mock).mockReturnValueOnce([2, jest.fn()])
		;(useState as jest.Mock).mockReturnValueOnce([
			[true, true, true, true],
			jest.fn()
		])
		;(useState as jest.Mock).mockReturnValue([
			[true, true, true, true],
			handleEdit
		])

		wrapper.rerender(<Home />)
		wrapper.getByText('nutritionalDataForm.edit').click()
		expect(handleEdit).toHaveBeenCalled()
	})
})
