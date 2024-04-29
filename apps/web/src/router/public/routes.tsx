import LayoutPublic from '@/router/public/Layout'
import { Navigate } from 'react-router-dom'
import {
	LoginLazy,
	LoginPartnerLazy,
	RegisterLazy,
	RegisterPartnerLazy
} from './lazy-pages'

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
		{
			path: '/partner/register',
			element: (
				<LayoutPublic>
					<RegisterPartnerLazy />
				</LayoutPublic>
			)
		},
		{
			path: '/partner/login',
			element: (
				<LayoutPublic>
					<LoginPartnerLazy />
				</LayoutPublic>
			)
		},
		{ path: '*', element: <Navigate to='/' replace /> }
	]
}
