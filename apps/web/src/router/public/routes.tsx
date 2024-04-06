import Register from '@/pages/Register'
import { Navigate } from 'react-router-dom'

export default function routes() {
	return [
		{
			path: '/register',
			element: <Register />
		},
		{ path: '*', element: <Navigate to='/register' replace /> }
	]
}
