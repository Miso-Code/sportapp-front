import '@/index.scss'
import Router from '@/router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../config/lang/form'
import '../config/lang/i18n'
import { StyledEngineProvider } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			light: '#677ea7',
			main: '#425E91',
			dark: '#2e4165',
			contrastText: '#fff'
		}
	}
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<Router />
			</StyledEngineProvider>
		</ThemeProvider>
	</React.StrictMode>
)
