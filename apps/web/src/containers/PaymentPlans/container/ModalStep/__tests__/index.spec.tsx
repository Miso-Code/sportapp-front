import ModalStep from '@/containers/PaymentPlans/container/ModalStep'
import {
	act,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'

describe('ModalStep', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(
			<ModalStep
				handleClose={jest.fn()}
				handleSubmit={jest.fn()}
				open={true}
				isFreePlan={false}
				isLoading={false}
				price={100}
			/>
		)
	})

	it('should render the component', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should render the component with free plan', () => {
		wrapper.rerender(
			<ModalStep
				handleClose={jest.fn()}
				handleSubmit={jest.fn()}
				open={true}
				isFreePlan={true}
				isLoading={false}
				price={0}
			/>
		)

		expect(wrapper).toMatchSnapshot()
	})

	it('should call handleSubmit when free plan is selected', async () => {
		const handleSubmit = jest.fn()
		wrapper.rerender(
			<ModalStep
				handleClose={jest.fn()}
				handleSubmit={handleSubmit}
				open={true}
				isFreePlan={true}
				isLoading={false}
				price={0}
			/>
		)

		act(() => {
			fireEvent.click(wrapper.getByText('form.obtain'))
		})

		await waitFor(() => {
			expect(handleSubmit).toHaveBeenCalledWith({
				amount: 0,
				cvc: '123',
				expiry: '12/90',
				name: 'Test User',
				number: '4242424242424242'
			})
		})
	})
})
