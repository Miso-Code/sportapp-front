import Layout from '@/router/private/Layout/partner'
import {
	CreateProductPartnerLazy,
	HomePartnerLazy,
	LangPartnerLazy,
	PurchasedProductPartnerLazy,
	UpdateProductPartnerLazy
} from '@/router/private/lazy-pages'
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
			{
				path: '/partner/product/update',
				element: <UpdateProductPartnerLazy />
			},
			{ path: '/partner/lang', element: <LangPartnerLazy /> },
			{ path: '*', element: <Navigate to='/partner/login' replace /> }
		]
	}
}
