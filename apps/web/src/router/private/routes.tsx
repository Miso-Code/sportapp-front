import Layout from '@/router/private/Layout'
import {
	ConfigLazy,
	HomeLazy,
	ListSchedulePreferencePageLazy,
	OtherServicePageLazy,
	PaymentOtherServicePageLazy,
	PreferenceCardSelectionPageLazy,
	PreferenceFormPageLazy,
	PreferencePageLazy,
	TrainingCalendarPageLazy,
	TrainingPageLazy
} from '@/router/private/lazy-pages'
import { Navigate } from 'react-router-dom'

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
			{
				path: '/other-services',
				element: <OtherServicePageLazy />
			},
			{
				path: '/other-services/checkout',
				element: <PaymentOtherServicePageLazy />
			},
			{
				path: '/training',
				element: <TrainingPageLazy />
			},
			{
				path: '/training/calendar',
				element: <TrainingCalendarPageLazy />
			},
			{ path: '*', element: <Navigate to='/' replace /> }
		]
	}
}
