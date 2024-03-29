import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import '../config/lang/i18n'
import Router from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>
)
