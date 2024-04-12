import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import Kpi from '../Kpi'

describe('Kpi', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(
			<Kpi type='progress' value={1} max={2} label='label' />
		)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render an icon if provided', () => {
		component.update(
			<Kpi type='progress' value={1} max={2} label='label' icon='fire' />
		)
		expect(component.root.findByProps({ testID: 'icon' })).toBeTruthy()
	})

	it('should render a progress bar if type is progress', () => {
		expect(
			component.root.findByProps({ 'data-testid': 'progressBar' })
		).toBeTruthy()
	})

	it('should render a line chart if type is lineChart', () => {
		component.update(
			<Kpi
				type='lineChart'
				data={[1, 2, 3]}
				labels={['1', '2', '3']}
				label='test'
			/>
		)
		expect(
			component.root.findByProps({ 'data-testid': 'lineChart' })
		).toBeTruthy()
	})
})
