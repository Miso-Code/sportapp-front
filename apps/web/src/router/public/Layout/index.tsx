import Spinner from '@/components/Spinner'
import { Props } from '@/router/public/Layout/interfaces/'
import { Box } from '@mui/material'
import { Suspense } from 'react'

export default function LayoutPublic({ children }: Props) {
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
			{children}
		</Suspense>
	)
}
