import { render, RenderResult } from '@testing-library/react'
import App from '@pages/Home'

describe('<App />', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<App />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})
})
