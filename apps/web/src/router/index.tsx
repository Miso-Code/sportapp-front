import PrivateRoutes from '@/router/private/routes'
import PrivateRoutesPartner from '@/router/private/routes-partner'
import PublicRoutes from '@/router/public/routes'
import { useLangStore } from '@sportapp/stores'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Router = () => {
	const { lang } = useLangStore()
	const router = createBrowserRouter([
		PrivateRoutes(),
		PrivateRoutesPartner(),
		...PublicRoutes()
	])

	const { i18n } = useTranslation()

	useEffect(() => {
		document.documentElement.lang = i18n.language
	}, [i18n.language])

	useEffect(() => {
		if (lang !== i18n.language) {
			i18n.changeLanguage(lang)
		}
	}, [i18n, lang])

	return <RouterProvider router={router} />
}

export default Router
