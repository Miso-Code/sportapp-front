import '@/index.scss'
import Router from '@/router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../config/lang/form'
import '../config/lang/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>
)
