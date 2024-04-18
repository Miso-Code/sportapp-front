import { lazy } from 'react'

export const HomeLazy = lazy(() => import('@/pages/User/Home'))
export const ConfigLazy = lazy(() => import('@/pages/User/Config'))
