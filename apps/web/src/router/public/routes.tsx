import LayoutPublic from '@/router/public/Layout'
import { Navigate } from 'react-router-dom'
import { LoginLazy, RegisterLazy } from './lazy-pages'

export default function routes() {
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
