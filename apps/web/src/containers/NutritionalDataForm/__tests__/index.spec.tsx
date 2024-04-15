import NutritionalDataForm from '..'
import { render, RenderResult } from '@testing-library/react'

jest.mock('@sportapp/stores/src/user', () => ({
	useUserStore: jest.fn().mockReturnValue({
		getProfile: jest.fn(),
		updateProfile: jest.fn(),
		getSport: jest.fn(),
		updateSport: jest.fn(),
		getNutrition: jest.fn(),
		updateNutrition: jest.fn(),
		getAllNutritionalLimitations: jest.fn(),
		user: {}
	})
}))

describe('NutritionalDataForm', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<NutritionalDataForm handleCustomSubmit={jest.fn()} />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render the title', () => {
		expect(
			wrapper.getByText('nutritionalDataForm.title')
		).toBeInTheDocument()
	})

	it('should render the form', () => {
		expect(wrapper.container.querySelector('form')).toBeInTheDocument()
	})
})
