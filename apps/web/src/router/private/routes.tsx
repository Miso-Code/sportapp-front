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
			{ path: '/preferences', element: <PreferencePageLazy /> },
			{
				path: '/preferences/selection',
				element: <PreferenceCardSelectionPageLazy />
			},
			{ path: '/preferences/form', element: <PreferenceFormPageLazy /> },
			{
				path: '/preferences/list-schedule',
				element: <ListSchedulePreferencePageLazy />
			},
			{ path: '*', element: <Navigate to='/' replace /> }
		]
	}
}
