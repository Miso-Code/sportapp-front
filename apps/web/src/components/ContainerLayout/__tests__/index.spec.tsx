import ContainerLayout from '..'
import { render, RenderResult } from '@testing-library/react'

describe('ContainerLayout', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<ContainerLayout>Children</ContainerLayout>)
	})

	it('should render without errors', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with secondary section', () => {
		wrapper.rerender(
			<ContainerLayout secondarySection={<div>Secondary Section</div>}>
				Children
			</ContainerLayout>
		)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with secondary section and add full in secundary section', () => {
		wrapper.rerender(
			<ContainerLayout secondarySection={<div>Secondary Section</div>}>
				test
			</ContainerLayout>
		)

		const secondarySection = wrapper.container.querySelector(
			'.container-layout-secondary-section'
		)
		expect(secondarySection).toHaveClass(
			'container-layout-secondary-section__full'
		)
	})

	it('should render with className', () => {
		wrapper.rerender(
			<ContainerLayout className='test-class'>Children</ContainerLayout>
		)
		expect(wrapper.container).toMatchSnapshot()
	})
})
