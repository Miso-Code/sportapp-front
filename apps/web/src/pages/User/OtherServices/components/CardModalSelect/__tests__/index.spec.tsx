import {
	act,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import CardModalSelect from '..'

describe('CardModalSelect', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(
			<CardModalSelect
				selectedProduct={{
					product_id: '6dcba8dc-c9ae-40c7-b42a-21029c7819d8',
					business_partner_id: 'f9368e86-dacd-4904-989a-ba5f23cd25ae',
					category: 'equipement',
					name: 'Awesome Rubber Computer',
					summary:
						'Adflicto sonitus fuga aperio calculus calamitas vicissitudo.',
					url: 'https://apprehensive-poem.net/',
					price: 408.0,
					payment_type: 'unique',
					payment_frequency: 'other',
					image_url: 'https://picsum.photos/seed/wPfJxYXCA/640/480',
					description:
						'Adipiscor demoror velit ventito reiciendis audacia pax abbas aliquam.',
					active: true
				}}
				quantity='1'
				handleQuantityChange={jest.fn()}
				handleClose={jest.fn()}
			/>
		)
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should call handleQuantityChange', async () => {
		const handleQuantityChange = jest.fn()
		wrapper.rerender(
			<CardModalSelect
				selectedProduct={{
					product_id: '6dcba8dc-c9ae-40c7-b42a-21029c7819d8',
					business_partner_id: 'f9368e86-dacd-4904-989a-ba5f23cd25ae',
					category: 'equipement',
					name: 'Awesome Rubber Computer',
					summary:
						'Adflicto sonitus fuga aperio calculus calamitas vicissitudo.',
					url: 'https://apprehensive-poem.net/',
					price: 408.0,
					payment_type: 'unique',
					payment_frequency: 'other',
					image_url: 'https://picsum.photos/seed/wPfJxYXCA/640/480',
					description:
						'Adipiscor demoror velit ventito reiciendis audacia pax abbas aliquam.',
					active: true
				}}
				quantity='1'
				handleQuantityChange={handleQuantityChange}
				handleClose={jest.fn()}
			/>
		)
		const input = wrapper.getByPlaceholderText('0')

		act(() => {
			fireEvent.change(input, { target: { value: '2' } })
		})

		await waitFor(() => {
			expect(handleQuantityChange).toHaveBeenCalled()
		})
	})
})
