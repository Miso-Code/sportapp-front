import Router from '@/router'
import { RenderResult, render } from '@testing-library/react'

jest.mock('@/pages/Home', () => () => <div>Home</div>)

describe('Router', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<Router />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the app', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
