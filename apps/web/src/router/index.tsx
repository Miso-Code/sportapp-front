import PrivateRoutes from '@/router/private/routes'
import PublicRoutes from '@/router/public/routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Router = () => {
	const router = createBrowserRouter([PrivateRoutes(), ...PublicRoutes()])

	return <RouterProvider router={router} />
}

export default Router
