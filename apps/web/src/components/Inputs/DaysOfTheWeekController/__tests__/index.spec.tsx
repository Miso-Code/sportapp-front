import { RenderResult, render, renderHook, act } from '@testing-library/react'
import DaysOfTheWeekController from 'components/Inputs/DaysOfTheWeekController'
import { useForm } from 'react-hook-form'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

describe('DaysOfTheWeekController', () => {
	const mockTheme = createTheme({
		palette: {
			primary: {
				main: '#ffffff',
				light: '#ffffff'
			},
			text: {
				disabled: '#ffffff'
			},
			action: {
				disabledBackground: '#ffffff'
			}
			// Add more properties as needed
		}
	})
	let wrapper: RenderResult

	beforeEach(() => {
		const { result } = renderHook(() => useForm())
		result.current.register('weekday')
		result.current.setValue('weekday', ['monday'])
		wrapper = render(
			<ThemeProvider theme={mockTheme}>
				<DaysOfTheWeekController
					control={result.current.control}
					name='weekday'
					label='Week Day'
				/>
			</ThemeProvider>
		)
	})

	afterEach(() => {
		wrapper.unmount()
		jest.resetAllMocks()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render disabled component', () => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<ThemeProvider theme={mockTheme}>
				<DaysOfTheWeekController
					control={result.current.control}
					name='weekday'
					label='Week Day'
					disabled
				/>
			</ThemeProvider>
		)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should display helper text when there is an error in input', () => {
		const { result } = renderHook(() => useForm())
		result.current.setError('weekday', {
			type: 'manual',
			message: 'At least one Weekday is required'
		})
		wrapper = render(
			<ThemeProvider theme={mockTheme}>
				<DaysOfTheWeekController
					control={result.current.control}
					name='weekday'
					label='Week Day'
				/>
			</ThemeProvider>
		)

		expect(
			wrapper.getByText('At least one Weekday is required')
		).toBeInTheDocument()
	})

	it('should render monday first if locale is starting with monday', async () => {
		const translation = renderHook(() => useTranslation())
		await act(async () => {
			await translation.result.current.i18n.changeLanguage('es-CO')
		})
		const { result } = renderHook(() => useForm())
		result.current.register('weekday')
		result.current.setValue('weekday', ['monday'])
		wrapper = render(
			<ThemeProvider theme={mockTheme}>
				<DaysOfTheWeekController
					control={result.current.control}
					name='weekday'
					label='Week Day'
				/>
			</ThemeProvider>
		)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should update the value when a day is selected', async () => {
		const { result } = renderHook(() => useForm())
		result.current.register('weekday')
		result.current.setValue('weekday', ['monday'])
		wrapper = render(
			<ThemeProvider theme={mockTheme}>
				<DaysOfTheWeekController
					control={result.current.control}
					name='weekday'
					label='Week Day'
				/>
			</ThemeProvider>
		)
		const [, sunday] = wrapper.getAllByText(
			'form.daysOfTheWeekValues.SUNDAY'
		)
		await act(async () => {
			sunday.click()
		})
		expect(result.current.getValues('weekday')).toEqual([
			'monday',
			'sunday'
		])
	})
})
