import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Box, Paper, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { Props } from './interfaces'

export default function FileUpload({
	onChange,
	sizeFile = 5, // 5MB
	accept = {
		'image/*': ['.jpg', '.jpeg', '.png', '.gif']
	},
	value,
	multiple,
	className = '',
	label,
	placeHolder = 'Drop file here'
}: Props) {
	const { getInputProps, getRootProps } = useDropzone({
		accept,
		onDrop: (acceptedFiles) => {
			onChange(acceptedFiles[0])
		},
		multiple,
		maxSize: sizeFile * 1024 * 1024
	})

	return (
		<div data-testid='container' className={className}>
			<Typography
				component='label'
				className='text-[#00000099] leading-8'
				variant='body1'>
				{label}
			</Typography>
			<Paper
				className={`hover:bg-gray-100 border  border-gray-400 cursor-pointer active:bg-gray-200 ${
					value
						? 'bg-blue-50 border-solid border-blue-500'
						: 'bg-white border-dashed'
				}`}
				variant='outlined'
				data-testid='dropzone'
				{...getRootProps()}>
				<input data-testid='drop-input' {...getInputProps()} />
				<Box className='flex flex-col items-center p-2'>
					<UploadFileIcon />
					{value ? (
						<Typography variant='caption'>{value.name}</Typography>
					) : (
						<Typography variant='caption'>{placeHolder}</Typography>
					)}
				</Box>
			</Paper>
		</div>
	)
}
