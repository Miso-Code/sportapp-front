import { Accept } from 'react-dropzone'

export interface Props {
	onChange: (file: File) => void
	sizeFile?: number
	accept?: Accept | undefined
	value?: File | null
	multiple?: boolean
	className?: string
	label?: string
	placeHolder?: string
}
