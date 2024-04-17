import { lazy } from 'react'

export const LoginLazy = lazy(() => import('@/pages/User/Login'))
export const RegisterLazy = lazy(() => import('@/pages/User/Register'))
