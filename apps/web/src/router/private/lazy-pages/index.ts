import { lazy } from 'react'

export const HomeLazy = lazy(() => import('pages/Home'))
export const ConfigLazy = lazy(() => import('pages/Config'))
