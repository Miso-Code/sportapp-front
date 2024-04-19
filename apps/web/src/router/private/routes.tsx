import Layout from '@/router/private/Layout'
import { Navigate } from 'react-router-dom'
import { ConfigLazy, HomeLazy } from '@/router/private/lazy-pages'

export default function privateRoutesUser() {
	return {
		element: <Layout />,
		children: [
			{ path: '/home', element: <HomeLazy /> },
			{ path: '/config', element: <ConfigLazy /> },
			{ path: '*', element: <Navigate to='/' replace /> }
		]
	}
}
