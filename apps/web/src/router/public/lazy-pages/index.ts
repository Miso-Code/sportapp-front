import { lazy } from 'react'

export const LoginLazy = lazy(() => import('@/pages/User/Login'))
export const RegisterLazy = lazy(() => import('@/pages/User/Register'))

// partner pages
export const RegisterPartnerLazy = lazy(
	() => import('@/pages/Partner/Register')
)
export const LoginPartnerLazy = lazy(() => import('@/pages/Partner/Login'))
