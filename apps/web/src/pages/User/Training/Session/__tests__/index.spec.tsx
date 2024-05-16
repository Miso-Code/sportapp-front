import { Product } from '@sportapp/sportapp-repository/src/businessPartner/interfaces'
import { FullSportSessionResponse } from '@sportapp/sportapp-repository/src/user/interfaces'
import { useBusinessPartnerStore, useSportSessionStore } from '@sportapp/stores'
import { RenderResult, act, render, waitFor } from '@testing-library/react'
import TrainingSession from '..'

jest.mock('../components/Charts/Gauge', () => () => <div>Gauge</div>)
jest.mock('../components/Charts/Lines', () => () => <div>Lines</div>)

jest.mock('@sportapp/stores', () => ({
	useBusinessPartnerStore: jest.fn().mockReturnValue({
		suggestProduct: jest.fn(),
		setProductToCheckout: jest.fn()
	}),
	useSportSessionStore: jest.fn().mockReturnValue({
		sportSession: {},
		getSportSession: jest.fn()
	}),
	useUserStore: jest.fn().mockReturnValue({
		user: {}
	})
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn().mockReturnValue(jest.fn()),
	useParams: jest.fn().mockReturnValue({
		id: '123'
	}),
	useLocation: jest.fn().mockReturnValue({
		search: '',
		pathname: '/training/session'
	})
}))

describe('TrainingSession', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<TrainingSession />)
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should call getSportSession', () => {
		const getSportSessionMock = jest.fn()
		const sportSessionMock: FullSportSessionResponse = {
			session_id: 'session_id',
			sport_id: 'sport_id',
			user_id: 'user_id',
			started_at: '10/10/2024',
			duration: 10,
			average_speed: 10,
			calories: 10,
			avg_heartrate: 10,
			distance: 10,
			max_heartrate: 20,
			min_heartrate: 30,
			steps: 120
		}
		;(useSportSessionStore as unknown as jest.Mock).mockReturnValue({
			sportSession: sportSessionMock,
			getSportSession: getSportSessionMock
		})
		wrapper.rerender(<TrainingSession />)
		expect(getSportSessionMock).toHaveBeenCalled()
		expect(getSportSessionMock).toHaveBeenCalledWith('123')
	})

	it('should call setProductToCheckoutMock', async () => {
		const suggestProductMock: Product = {
			name: 'name',
			description: 'description',
			price: 10,
			category: 'nutrition',
			active: true,
			business_partner_id: 'business_partner_id',
			image_url: 'image_url',
			product_id: 'product_id',
			payment_type: 'periodic',
			payment_frequency: 'other',
			summary: 'summary',
			url: 'url',
			sport_id: 'sport_id'
		}
		const suggestProduct = jest.fn().mockResolvedValue(suggestProductMock)

		;(useBusinessPartnerStore as unknown as jest.Mock).mockReturnValue({
			suggestProduct,
			setProductToCheckout: jest.fn()
		})
		wrapper.rerender(<TrainingSession />)
		await act(async () => {
			await waitFor(() => {
				expect(suggestProduct).toHaveBeenCalled()
			})
		})
	})
})
