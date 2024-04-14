import { act, renderHook } from '@testing-library/react'
import { useSportSessionStore } from '../index'
import { FullSportSessionResponse } from '@sportapp/sportapp-repository/src/sportSession/interfaces'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

jest.mock('@sportapp/sportapp-repository/src/sportSession', () => {
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
			createSportSession: jest.fn().mockResolvedValue({
				session_id: 'session_id',
				sport_id: 'sport_id',
				user_id: 'user_id',
				started_at: 'started_at'
			}),
			addSportSessionLocation: jest.fn().mockResolvedValue({
				session_id: 'session_id',
				latitude: 1,
				longitude: 1,
				altitude: 1,
				accuracy: 1,
				altitudeAccuracy: 1,
				heading: 1,
				speed: 1
			}),
			finishSportSession: jest.fn().mockResolvedValue({
				session_id: 'session_id',
				sport_id: 'sport_id',
				user_id: 'user_id',
				started_at: 'started_at',
				duration: 1,
				distance: 1,
				steps: 1,
				calories: 1,
				average_speed: 1,
				min_heartrate: 1,
				max_heartrate: 1,
				avg_heartrate: 1
			}),
			getAllSportSessions: jest.fn().mockResolvedValue([
				{
					session_id: 'session_id',
					sport_id: 'sport_id',
					user_id: 'user_id',
					started_at: 'started_at',
					duration: 1,
					distance: 1,
					steps: 1,
					calories: 1,
					average_speed: 1,
					min_heartrate: 1,
					max_heartrate: 1,
					avg_heartrate: 1
				}
			])
		}))
	}
})

describe('SportSessionStore', () => {
	const OLD_ENV = process.env
	beforeEach(() => {
		jest.resetModules()
		process.env = { ...OLD_ENV }
	})

	it('should clear state', async () => {
		const { result } = renderHook(() => useSportSessionStore())
		const { clearState } = result.current
		await act(async () => {
			await clearState()
		})
		expect(result.current).toStrictEqual({
			sportSession: undefined,
			sportSessions: [],
			setSportSession: expect.any(Function),
			startSportSession: expect.any(Function),
			addSessionLocation: expect.any(Function),
			finishSportSession: expect.any(Function),
			getSportSessions: expect.any(Function),
			clearState: expect.any(Function)
		})
	})

	describe('startSportSession', () => {
		const initialStoreState = useSportSessionStore.getState()

		beforeEach(() => {
			useSportSessionStore.setState(initialStoreState)
		})

		it('should create and start a sport session', async () => {
			const { result } = renderHook(() => useSportSessionStore())

			const { startSportSession } = result.current

			const startSessionPayload: Parameters<typeof startSportSession>[0] =
				{
					sport_id: 'sport_id',
					user_id: 'user_id',
					started_at: 'started_at',
					initial_location: {
						latitude: 1,
						longitude: 1,
						altitude: 1,
						accuracy: 1,
						altitude_accuracy: 1,
						heading: 1,
						speed: 1
					}
				}

			await act(async () => {
				const response = await startSportSession(startSessionPayload)
				expect(response).toStrictEqual({
					session_id: 'session_id',
					sport_id: 'sport_id',
					user_id: 'user_id',
					started_at: 'started_at'
				})
			})
		})
	})
	describe('addSessionLocation', () => {
		const initialStoreState = useSportSessionStore.getState()

		beforeEach(() => {
			useSportSessionStore.setState(initialStoreState)
		})

		it('should add a location to a sport session', async () => {
			const { result } = renderHook(() => useSportSessionStore())

			const { addSessionLocation } = result.current

			const addLocationPayload: Parameters<typeof addSessionLocation>[0] =
				{
					session_id: 'session_id',
					latitude: 1,
					longitude: 1,
					altitude: 1,
					accuracy: 1,
					altitude_accuracy: 1,
					heading: 1,
					speed: 1
				}

			await act(async () => {
				const response = await addSessionLocation(addLocationPayload)
				expect(response).toStrictEqual({
					session_id: 'session_id',
					latitude: 1,
					longitude: 1,
					altitude: 1,
					accuracy: 1,
					altitudeAccuracy: 1,
					heading: 1,
					speed: 1
				})
			})
		})
	})

	describe('finishSportSession', () => {
		const initialStoreState = useSportSessionStore.getState()

		beforeEach(() => {
			useSportSessionStore.setState(initialStoreState)
		})

		it('should finish a sport session', async () => {
			const { result } = renderHook(() => useSportSessionStore())

			const { finishSportSession } = result.current

			const finishSessionPayload: Parameters<
				typeof finishSportSession
			>[0] = {
				session_id: 'session_id',
				duration: 1,
				distance: 1,
				steps: 1,
				calories: 1,
				average_speed: 1,
				min_heartrate: 1,
				max_heartrate: 1,
				avg_heartrate: 1
			}

			await act(async () => {
				const response = await finishSportSession(finishSessionPayload)
				expect(response).toStrictEqual({
					session_id: 'session_id',
					sport_id: 'sport_id',
					user_id: 'user_id',
					started_at: 'started_at',
					duration: 1,
					distance: 1,
					steps: 1,
					calories: 1,
					average_speed: 1,
					min_heartrate: 1,
					max_heartrate: 1,
					avg_heartrate: 1
				})
			})
		})

		it('should set the sport session', async () => {
			const { result } = renderHook(() => useSportSessionStore())

			const { finishSportSession } = result.current

			const finishSessionPayload: Parameters<
				typeof finishSportSession
			>[0] = {
				session_id: 'session_id',
				duration: 1,
				distance: 1,
				steps: 1,
				calories: 1,
				average_speed: 1,
				min_heartrate: 1,
				max_heartrate: 1,
				avg_heartrate: 1
			}

			await act(async () => {
				await finishSportSession(finishSessionPayload)
			})

			expect(result.current.sportSession).toStrictEqual({
				session_id: 'session_id',
				sport_id: 'sport_id',
				user_id: 'user_id',
				started_at: 'started_at',
				duration: 1,
				distance: 1,
				steps: 1,
				calories: 1,
				average_speed: 1,
				min_heartrate: 1,
				max_heartrate: 1,
				avg_heartrate: 1
			})
		})
	})
	describe('getSportSessions', () => {
		const initialStoreState = useSportSessionStore.getState()

		beforeEach(() => {
			useSportSessionStore.setState(initialStoreState)
		})

		it('should get all sport sessions', async () => {
			const { result } = renderHook(() => useSportSessionStore())

			const { getSportSessions } = result.current

			await act(async () => {
				const response = await getSportSessions()
				expect(response).toStrictEqual([
					{
						session_id: 'session_id',
						sport_id: 'sport_id',
						user_id: 'user_id',
						started_at: 'started_at',
						duration: 1,
						distance: 1,
						steps: 1,
						calories: 1,
						average_speed: 1,
						min_heartrate: 1,
						max_heartrate: 1,
						avg_heartrate: 1
					}
				])
			})
		})
	})
	describe('setSportSession', () => {
		const initialStoreState = useSportSessionStore.getState()

		beforeEach(() => {
			useSportSessionStore.setState(initialStoreState)
		})

		it('should set the sport session', async () => {
			const { result } = renderHook(() => useSportSessionStore())

			const { setSportSession } = result.current

			const sportSession: FullSportSessionResponse = {
				duration: 1,
				session_id: 'session_id',
				sport_id: 'sport_id',
				started_at: 'started_at',
				user_id: 'user_id',
				average_speed: 1,
				avg_heartrate: 1,
				calories: 1,
				distance: 1,
				max_heartrate: 1,
				min_heartrate: 1,
				steps: 1
			}

			await act(async () => {
				await setSportSession(sportSession)
			})

			expect(result.current.sportSession).toStrictEqual(sportSession)
		})
	})
})
