import { lazy } from 'react'

export const HomeLazy = lazy(() => import('@/pages/User/Home'))
export const ConfigLazy = lazy(() => import('@/pages/User/Config'))

// partner pages
export const HomePartnerLazy = lazy(() => import('@/pages/Partner/Home'))
export const CreateProductPartnerLazy = lazy(
	() => import('@/pages/Partner/CreateProduct')
)
export const PurchasedProductPartnerLazy = lazy(
	() => import('@/pages/Partner/PurchasedProduct')
)
export const UpdateProductPartnerLazy = lazy(
	() => import('@/pages/Partner/UpdateProduct')
)
//premium
export const PreferencePageLazy = lazy(() => import('@/pages/User/Preference'))
export const PreferenceFormPageLazy = lazy(
	() => import('@/pages/User/Preference/Form')
)
export const PreferenceCardSelectionPageLazy = lazy(
	() => import('@/pages/User/Preference/CardSelection')
)
export const ListSchedulePreferencePageLazy = lazy(
	() => import('@/pages/User/Preference/List')
)
