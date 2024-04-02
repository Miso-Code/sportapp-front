import Layout from '@/router/private/Layout'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Home = lazy(() => import('pages/Home'))

export default function privateRoutes() {
	return {
		element: <Layout />,
		children: [
			{ path: '/home', element: <Home /> },
			{ path: '*', element: <Navigate to='/' replace /> }
		]
	}
}
