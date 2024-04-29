import Spinner from '@/components/Spinner'
import { Box } from '@mui/material'
import { usePartnerAuthStore } from '@sportapp/stores/src/partner/auth'
import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function LayoutPartner() {
	const { isAuth } = usePartnerAuthStore()
	if (!isAuth) return <Navigate to='/partner/login' replace />
	return (
		<Suspense
			fallback={
				<Box
					sx={{
						display: 'grid',
						placeContent: 'center',
						width: '100vw',
						height: '100vh'
					}}>
					<Spinner />
				</Box>
			}>
			<Outlet />
		</Suspense>
	)
}
