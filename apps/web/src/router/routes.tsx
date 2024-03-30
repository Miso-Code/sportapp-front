import { RouteObject } from 'react-router-dom'
import Home from 'pages/Home'
import Register from '@/pages/Register'

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Register />
	},
	{
		path: '/home',
		element: <Home />
	}
]
