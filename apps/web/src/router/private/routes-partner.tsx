import Layout from '@/router/private/Layout/partner'
import { CreateProductPartnerLazy, HomePartnerLazy, PurchasedProductPartnerLazy } from '@/router/private/lazy-pages'
import { Navigate } from 'react-router-dom'

export default function privateRoutesUser() {
	return {
		element: <Layout />,
		children: [
			{ path: '/partner/home', element: <HomePartnerLazy /> },
			{
				path: '/partner/product/create',
				element: <CreateProductPartnerLazy />
			},
			{
				path: '/partner/product/purchased',
				element: <PurchasedProductPartnerLazy />
			},
			{ path: '*', element: <Navigate to='/' replace /> }
		]
	}
}
