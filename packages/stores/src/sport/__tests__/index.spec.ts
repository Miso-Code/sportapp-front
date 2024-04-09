import { act, renderHook } from '@testing-library/react'
import { useSportStore } from '../index'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

jest.mock('@sportapp/sportapp-repository/src/sport', () => {
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
			getAllSports: jest.fn().mockResolvedValue([
				{
					sport_id: 'sport_id',
					name: 'name'
				},
				{
					sport_id: 'sport_id2',
					name: 'name2'
				}
			]),
			getSportById: jest.fn().mockResolvedValue({
				sport_id: 'sport_id',
				name: 'name'
			})
		}))
	}
})

describe('SportStore', () => {
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
		const { result } = renderHook(() => useSportStore())
		const { clearState } = result.current

		await act(async () => {
			await clearState()
		})
		console.log(result.current)
		expect(result.current.sports).toStrictEqual([])
	})

	describe('getAllSports', () => {
		const initialStoreState = useSportStore.getState()

		beforeEach(() => {
			useSportStore.setState(initialStoreState)
		})

		it('should return and set all sports', async () => {
			const { result } = renderHook(() => useSportStore())

			expect(result.current.sports).toStrictEqual([])

			const { getSports } = result.current

			await act(async () => {
				const sports = await getSports()
				expect(sports).toStrictEqual([
					{
						sport_id: 'sport_id',
						name: 'name'
					},
					{
						sport_id: 'sport_id2',
						name: 'name2'
					}
				])
			})

			expect(result.current.sports).toStrictEqual([
				{
					sport_id: 'sport_id',
					name: 'name'
				},
				{
					sport_id: 'sport_id2',
					name: 'name2'
				}
			])
		})
	})

	describe('getSport', () => {
		const initialStoreState = useSportStore.getState()

		beforeEach(() => {
			useSportStore.setState(initialStoreState)
		})

		it('should return a single sport', async () => {
			const { result } = renderHook(() => useSportStore())

			const { getSport } = result.current

			await act(async () => {
				const sport = await getSport('sport_id')
				expect(sport).toStrictEqual({
					sport_id: 'sport_id',
					name: 'name'
				})
			})
		})
	})
})
