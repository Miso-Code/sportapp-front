import '@/index.scss'
import Router from '@/router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../config/lang/form'
import '../config/lang/i18n'
import { StyledEngineProvider } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			<Router />
		</StyledEngineProvider>
	</React.StrictMode>
)
