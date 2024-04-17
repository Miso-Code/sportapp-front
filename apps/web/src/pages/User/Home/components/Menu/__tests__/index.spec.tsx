import { act, fireEvent, render, RenderResult } from '@testing-library/react'
import ProfileMenu from '..'

describe('ProfileMenu', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<ProfileMenu />)
	})

	afterEach(() => {
		wrapper.unmount()
		jest.clearAllMocks()
	})

	it('should render', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with className', () => {
		wrapper.rerender(<ProfileMenu className='test' />)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with fullName', () => {
		wrapper.rerender(<ProfileMenu fullName='John Doe' />)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with email', () => {
		wrapper.rerender(<ProfileMenu email='test@email.com' />)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with fullName and email', () => {
		wrapper.rerender(
			<ProfileMenu fullName='John Doe' email='test@email.com' />
		)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with selected', () => {
		wrapper.rerender(<ProfileMenu selected={0} />)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('renders correctly with full name and email', () => {
		const { getByText } = render(
			<ProfileMenu
				fullName='John Doe'
				email='john@example.com'
				selected={0}
				setSelected={jest.fn()}
			/>
		)
		expect(getByText('John Doe')).toBeInTheDocument()
		expect(getByText('john@example.com')).toBeInTheDocument()
	})

	it('should call setSelected', () => {
		const setSelected = jest.fn()
		const { container } = render(
			<ProfileMenu fullName='John Doe' setSelected={setSelected} />
		)
		const items = container.querySelectorAll('.profile-menu-item')
		items.forEach((item, index) => {
			act(() => {
				fireEvent.click(item)
			})

			expect(setSelected).toHaveBeenCalledWith(index)
		})
	})
})
