import Layout from '@/router/private/Layout/partner'
import { HomePartnerLazy } from '@/router/private/lazy-pages'
import { Navigate } from 'react-router-dom'

export default function privateRoutesUser() {
	return {
		element: <Layout />,
		children: [
			{ path: '/partner/home', element: <HomePartnerLazy /> },
			{ path: '*', element: <Navigate to='/' replace /> }
		]
	}
}
