import LayoutPartner from '@/router/private/Layout/partner'
import { RenderResult, render } from '@testing-library/react'
import { useAuthStore } from '@sportapp/stores/src/auth'

jest.mock('@sportapp/stores/src/auth', () => ({
	useAuthStore: jest.fn(() => ({
		isAuth: true
	}))
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	Navigate: () => <div>Navigate</div>
}))

describe('LayoutPartner', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<LayoutPartner />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should return navigate component', () => {
		;(useAuthStore as unknown as jest.Mock).mockImplementationOnce(() => ({
			isAuth: false
		}))
		wrapper.rerender(<LayoutPartner />)
		expect(wrapper.container).toMatchSnapshot()
	})
})
