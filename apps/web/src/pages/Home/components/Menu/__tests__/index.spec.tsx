import ProfileMenu from '..'
import { render, RenderResult } from '@testing-library/react'

describe('ProfileMenu', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<ProfileMenu className='test-class' />)
	})

	it('should render without errors', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
