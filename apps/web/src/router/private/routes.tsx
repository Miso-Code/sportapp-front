import Layout from '@/router/private/Layout'
import { Navigate } from 'react-router-dom'
import {
	ConfigLazy,
	HomeLazy,
	ListSchedulePreferencePageLazy,
	PreferenceCardSelectionPageLazy,
	PreferenceFormPageLazy,
	PreferencePageLazy
} from '@/router/private/lazy-pages'

export default function privateRoutesUser() {
	return {
		element: <Layout />,
		children: [
			{ path: '/home', element: <HomeLazy /> },
			{ path: '/config', element: <ConfigLazy /> },
			{ path: '/premium', element: <PreferencePageLazy /> },
			{
				path: '/premium/selection',
				element: <PreferenceCardSelectionPageLazy />
			},
			{ path: '/premium/form', element: <PreferenceFormPageLazy /> },
			{
				path: '/premium/list-schedule',
				element: <ListSchedulePreferencePageLazy />
			},
			{ path: '*', element: <Navigate to='/' replace /> }
		]
	}
}
