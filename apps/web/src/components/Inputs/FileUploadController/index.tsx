import FileUpload from '@/components/InputFileDrop'
import { Controller, FieldValues } from 'react-hook-form'
import { Props } from './interfaces'

export default function InputFileUploadController<
	T extends FieldValues = FieldValues
>({ control, name, label, className, placeHolder }: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange } }) => (
				<FileUpload
					className={className}
					onChange={onChange}
					value={value}
					label={label}
					placeHolder={placeHolder}
				/>
			)}
		/>
	)
}
