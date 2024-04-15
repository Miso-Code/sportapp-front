import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import LayoutPublic from '@/router/public/Layout'

export default function routes() {
	const LoginLazy = lazy(() => import('@/pages/Login'))
	const RegisterLazy = lazy(() => import('@/pages/Register'))
	return [
		{
			path: '/register',
			element: (
				<LayoutPublic>
					<RegisterLazy />
				</LayoutPublic>
			)
		},
		{
			path: '/',
			element: (
				<LayoutPublic>
					<LoginLazy />
				</LayoutPublic>
			)
		},
		{ path: '*', element: <Navigate to='/' replace /> }
	]
}
