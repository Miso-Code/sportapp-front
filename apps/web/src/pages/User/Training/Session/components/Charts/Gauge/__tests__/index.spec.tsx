import GaugeChart from '..'
import { render, RenderResult } from '@testing-library/react'

jest.mock('@mui/x-charts/PieChart', () => ({
	PieChart: () => <div>PieChart</div>
}))

describe('GaugeChart', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<GaugeChart maxValue={100} value={50} />)
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
