import { act, renderHook } from '@testing-library/react'
import { useSportEventStore } from '../index'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

jest.mock('@sportapp/sportapp-repository/src/sportEvent', () => {
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
			getAllSportEvents: jest.fn().mockResolvedValue([
				{
					event_id: 'event_id',
					sport_id: 'sport_id',
					location_latitude: 1,
					location_longitude: 1,
					start_date: '2024-05-08T23:14:16.147Z',
					end_date: '2024-05-08T23:14:16.147Z',
					title: 'title',
					capacity: 10,
					description: 'description'
				},
				{
					event_id: 'event_id2',
					sport_id: 'sport_id',
					location_latitude: 1,
					location_longitude: 1,
					start_date: '2024-05-08T23:14:16.147Z',
					end_date: '2024-05-08T23:14:16.147Z',
					title: 'title',
					capacity: 10,
					description: 'description'
				}
			]),
			getSportEventById: jest.fn().mockResolvedValue({
				event_id: 'event_id',
				sport_id: 'sport_id',
				location_latitude: 1,
				location_longitude: 1,
				start_date: '2024-05-08T23:14:16.147Z',
				end_date: '2024-05-08T23:14:16.147Z',
				title: 'title',
				capacity: 10,
				description: 'description'
			})
		}))
	}
})

describe('SportEventStore', () => {
	const OLD_ENV = process.env
	beforeEach(() => {
		jest.resetModules()
		process.env = { ...OLD_ENV }
	})

	afterEach(async () => {
		process.env = OLD_ENV
		jest.clearAllMocks()
	})

	it('should clear state', async () => {
		const { result } = renderHook(() => useSportEventStore())
		const { clearState } = result.current

		await act(async () => {
			await clearState()
		})

		expect(result.current.sportEvents).toStrictEqual([])
	})

	describe('getAllSports', () => {
		const initialStoreState = useSportEventStore.getState()

		beforeEach(() => {
			useSportEventStore.setState(initialStoreState)
		})

		it('should return and set all sports', async () => {
			const { result } = renderHook(() => useSportEventStore())

			expect(result.current.sportEvents).toStrictEqual([])

			const { getSportEvents } = result.current

			await act(async () => {
				const sports = await getSportEvents(0, 0)
				expect(sports).toStrictEqual([
					{
						event_id: 'event_id',
						sport_id: 'sport_id',
						location_latitude: 1,
						location_longitude: 1,
						start_date: '2024-05-08T23:14:16.147Z',
						end_date: '2024-05-08T23:14:16.147Z',
						title: 'title',
						capacity: 10,
						description: 'description'
					},
					{
						event_id: 'event_id2',
						sport_id: 'sport_id',
						location_latitude: 1,
						location_longitude: 1,
						start_date: '2024-05-08T23:14:16.147Z',
						end_date: '2024-05-08T23:14:16.147Z',
						title: 'title',
						capacity: 10,
						description: 'description'
					}
				])
			})

			expect(result.current.sportEvents).toStrictEqual([
				{
					event_id: 'event_id',
					sport_id: 'sport_id',
					location_latitude: 1,
					location_longitude: 1,
					start_date: '2024-05-08T23:14:16.147Z',
					end_date: '2024-05-08T23:14:16.147Z',
					title: 'title',
					capacity: 10,
					description: 'description'
				},
				{
					event_id: 'event_id2',
					sport_id: 'sport_id',
					location_latitude: 1,
					location_longitude: 1,
					start_date: '2024-05-08T23:14:16.147Z',
					end_date: '2024-05-08T23:14:16.147Z',
					title: 'title',
					capacity: 10,
					description: 'description'
				}
			])
		})
	})

	describe('getSportEvent', () => {
		const initialStoreState = useSportEventStore.getState()

		beforeEach(() => {
			useSportEventStore.setState(initialStoreState)
		})

		it('should return a single sport', async () => {
			const { result } = renderHook(() => useSportEventStore())

			const { getSportEvent } = result.current

			await act(async () => {
				const sport = await getSportEvent('sport_id')
				expect(sport).toStrictEqual({
					event_id: 'event_id',
					sport_id: 'sport_id',
					location_latitude: 1,
					location_longitude: 1,
					start_date: '2024-05-08T23:14:16.147Z',
					end_date: '2024-05-08T23:14:16.147Z',
					title: 'title',
					capacity: 10,
					description: 'description'
				})
			})
		})
	})
})
