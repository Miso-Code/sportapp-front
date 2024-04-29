import CreateProduct from '../index'
import { render, RenderResult } from '@testing-library/react'

jest.mock('@/utils/files', () => ({
	toBase64: jest.fn().mockResolvedValue('image64')
}))

describe('CreateProduct', () => {
	let component: RenderResult

	beforeEach(() => {
		component = render(<CreateProduct onHandleSubmit={jest.fn()} />)
	})

	it('should render', () => {
		expect(component).toMatchSnapshot()
	})
})
