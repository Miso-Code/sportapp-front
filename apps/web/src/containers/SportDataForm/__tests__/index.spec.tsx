import SportDataForm from '..'
import { render, RenderResult } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material'

describe('SportDataForm', () => {
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
		wrapper = render(
			<ThemeProvider theme={mockTheme}>
				<SportDataForm handleCustomSubmit={jest.fn()} />
			</ThemeProvider>
		)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
