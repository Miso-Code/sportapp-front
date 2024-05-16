import LineChart from '..'
import { render, RenderResult } from '@testing-library/react'

jest.mock('@mui/x-charts/LineChart', () => ({
	LineChart: () => <div>LineChart</div>
}))

describe('LineChart', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<LineChart data={[]} />)
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
