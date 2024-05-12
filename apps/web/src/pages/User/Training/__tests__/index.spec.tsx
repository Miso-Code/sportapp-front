import TrainingPage from '..'
import {
	act,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import { useNavigate } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn().mockReturnValue(jest.fn()),
	useLocation: jest.fn().mockReturnValue({ pathname: '/training' })
}))

describe('TrainingPage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<TrainingPage />)
	})

	it('should render the component', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should call navigate to "/training/calendar"', async () => {
		const navigateMock = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigateMock)
		wrapper.rerender(<TrainingPage />)
		const menuItems = wrapper.container.querySelectorAll(
			'.training-menu-item'
		)

		act(() => {
			fireEvent.click(menuItems[0])
		})

		await waitFor(() => {
			expect(navigateMock).toHaveBeenCalledWith('/training/calendar')
		})
	})

    it('should call navigate to "/training/nutritionalPlan"', async () => {
        const navigateMock = jest.fn()
        ;(useNavigate as jest.Mock).mockReturnValue(navigateMock)
        wrapper.rerender(<TrainingPage />)
        const menuItems = wrapper.container.querySelectorAll(
            '.training-menu-item'
        )

        act(() => {
            fireEvent.click(menuItems[1])
        })

        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith('/training/nutritionalPlan')
        })
    })
})
