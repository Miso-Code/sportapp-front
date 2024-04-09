import { CircularProgress } from '@mui/material'
import { useAuthStore } from '@sportapp/stores/src/auth'
import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Layout() {
	const { isAuth } = useAuthStore()
	if (!isAuth) return <Navigate to='/' replace />
	return (
		<Suspense fallback={<CircularProgress size='large' />}>
			<Outlet />
		</Suspense>
	)
}
