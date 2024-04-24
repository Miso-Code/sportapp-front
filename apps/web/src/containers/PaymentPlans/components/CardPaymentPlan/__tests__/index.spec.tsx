import CardPaymentPlan from '..'
import { render, RenderResult } from '@testing-library/react'

describe('CardPaymentPlan', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(
			<CardPaymentPlan
				benefits={[
					{
						description: 'description 1',
						isActive: true
					},
					{
						description: 'description 2',
						isActive: true
					},
					{
						description: 'description 3',
						isActive: true
					},
					{
						description: 'description 4',
						isActive: true
					},
					{
						description: 'description 5',
						isActive: true
					}
				]}
				duration='mes'
				price={5}
				description='description'
				name='name'
			/>
		)
	})

	it('should render the component', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should render the component with the correct name', () => {
		expect(wrapper.getByText('name')).toBeInTheDocument()
	})

	it('should render the component with the correct description', () => {
		expect(wrapper.getByText('description')).toBeInTheDocument()
	})

	it('should render the component with the correct price', () => {
		expect(wrapper.getByText('$5')).toBeInTheDocument()
	})

	it('should render the component with the correct duration', () => {
		expect(wrapper.getByText('/ mes')).toBeInTheDocument()
	})

	it('should render the component with the correct benefits', () => {
		expect(wrapper.getByText('description 1')).toBeInTheDocument()
		expect(wrapper.getByText('description 2')).toBeInTheDocument()
		expect(wrapper.getByText('description 3')).toBeInTheDocument()
		expect(wrapper.getByText('description 4')).toBeInTheDocument()
		expect(wrapper.getByText('description 5')).toBeInTheDocument()
	})
})
