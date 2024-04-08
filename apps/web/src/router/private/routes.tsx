import Layout from '@/router/private/Layout'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

export default function privateRoutes() {
	const Home = lazy(() => import('pages/Home'))

	return {
		element: <Layout />,
		children: [
			{ path: '/home', element: <Home /> },
			{ path: '*', element: <Navigate to='/' replace /> }
		]
	}
}
