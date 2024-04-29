import ConfigPage from '..'
import { render, RenderResult } from '@testing-library/react'

jest.mock('@sportapp/stores', () => ({
	useUserStore: jest.fn().mockReturnValue({
		user: {
			profileData: {
				subscription_type: 'premium'
			}
		}
	}),
	useAuthStore: jest.fn().mockReturnValue({
		logout: jest.fn()
	})
}))

describe('ConfigPage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<ConfigPage />)
	})

	it('should render', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render component', () => {
		wrapper.rerender(<ConfigPage />)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render title', () => {
		expect(wrapper.getByText('config.title')).toBeInTheDocument()
	})
})
