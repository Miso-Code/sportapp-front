import App from 'pages/Home'
import {
	createBrowserRouter,
	RouteObject,
	RouterProvider
} from 'react-router-dom'

const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />
	}
]

const router = createBrowserRouter(routes)

const Router = () => <RouterProvider router={router} />

export default Router
