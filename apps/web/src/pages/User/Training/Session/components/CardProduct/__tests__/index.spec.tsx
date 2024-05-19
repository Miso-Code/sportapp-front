import CardProduct from '..'
import { render, RenderResult } from '@testing-library/react'

describe('CardProduct', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(
			<CardProduct
				description='description'
				image='image'
				title='title'
			/>
		)
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
