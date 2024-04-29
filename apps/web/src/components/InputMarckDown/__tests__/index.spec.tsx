import InputMarckDown from '../index'
import { RenderResult, render, screen } from '@testing-library/react'

jest.mock('@uiw/react-md-editor', () => ({
	__esModule: true,
	default: () => <div>MarkdownEditor</div>
}))

describe('InputMarckDown', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(
			<InputMarckDown label='label' value='' onChange={jest.fn()} />
		)
	})

	it('should render the component', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should render the component with a label', () => {
		expect(screen.getByText('label')).toBeInTheDocument()
	})
})
