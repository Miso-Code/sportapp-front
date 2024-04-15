import PrivateRoutes from '@/router/private/routes'
import PublicRoutes from '@/router/public/routes'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Router = () => {
	const router = createBrowserRouter([PrivateRoutes(), ...PublicRoutes()])

	const { i18n } = useTranslation()

	useEffect(() => {
		document.documentElement.lang = i18n.language
	}, [i18n.language])

	return <RouterProvider router={router} />
}

export default Router
