import InfoCards from '..'
import { render, RenderResult } from '@testing-library/react'

describe('InfoCards', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(
			<InfoCards
				titleComponent='Test'
				description='Test'
				state={{ type: 'BACK', text: 'Test' }}
				date='Test'
				onClick={() => {}}
			/>
		)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with showChip', () => {
		wrapper.rerender(
			<InfoCards
				titleComponent='Test'
				description='Test'
				state={{ type: 'BACK', text: 'Test' }}
				date='Test'
				onClick={() => {}}
				showChip={false}
			/>
		)
		expect(wrapper.container).toMatchSnapshot()
	})
})
