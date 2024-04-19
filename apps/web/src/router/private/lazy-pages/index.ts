import { lazy } from 'react'

export const HomeLazy = lazy(() => import('@/pages/User/Home'))
export const ConfigLazy = lazy(() => import('@/pages/User/Config'))

// partner pages
export const HomePartnerLazy = lazy(() => import('@/pages/Partner/Home'))
