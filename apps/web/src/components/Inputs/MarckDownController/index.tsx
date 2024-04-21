import InputMarckDown from '@/components/InputMarckDown'
import { Props } from './interfaces'
import { Controller, FieldValues } from 'react-hook-form'

export default function MarckDownController<
	T extends FieldValues = FieldValues
>({ control, label, name }: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange } }) => (
				<InputMarckDown
					value={value}
					label={label}
					onChange={onChange}
				/>
			)}
		/>
	)
}
