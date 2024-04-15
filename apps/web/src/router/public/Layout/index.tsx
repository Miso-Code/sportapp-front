import { Props } from '@/router/public/Layout/interfaces/'
import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'

export default function LayoutPublic({ children }: Props) {
	return (
		<Suspense fallback={<CircularProgress size='large' />}>
			{children}
		</Suspense>
	)
}
