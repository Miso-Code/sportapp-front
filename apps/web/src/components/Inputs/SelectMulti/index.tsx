import {
	Chip,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent
} from '@mui/material'
import { Props } from './interfaces'
import { Ref, forwardRef, memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function SelectMultiComponent(
	{
		label,
		name,
		options,
		error,
		formControlProps,
		inputLabelProps,
		isTranslated,
		selectProps,
		value,
		isDisabled,
		onChange
	}: Props,
	ref: Ref<HTMLInputElement>
) {
	const { t } = useTranslation()

	const [currentValue, setCurrentValue] = useState<string | string[]>(value)

	useEffect(() => {
		setCurrentValue(value)
	}, [value])

	const handleMultipleSelect = useCallback((): JSX.Element => {
		return <></>
	}, [])

	if (isDisabled)
		return (
			<div className='w-full'>
				<InputLabel id={`${name}-select-label`} {...inputLabelProps}>
					{label}
				</InputLabel>
				<div className='flex gap-2 mt-4'>
					{Array.isArray(currentValue) &&
						currentValue.map((valueCurrent) => (
							<Chip
								key={valueCurrent}
								label={
									options.find(
										(option) =>
											option.value === valueCurrent
									)?.label
								}
								disabled={isDisabled}
							/>
						))}
				</div>
			</div>
		)

	return (
		<FormControl
			disabled={isDisabled}
			fullWidth
			error={!!error}
			{...formControlProps}>
			<InputLabel id={`${name}-select-label`} {...inputLabelProps}>
				{label}
			</InputLabel>

			<Select
				{...selectProps}
				inputRef={ref}
				labelId={`${name}-select-label`}
				value={currentValue}
				defaultValue={selectProps?.multiple ? [] : ''}
				label={label}
				multiple={selectProps?.multiple || false}
				renderValue={handleMultipleSelect}
				slotProps={{
					input: {
						id: name,
						name: name
					}
				}}
				onChange={onChange}>
				{options.map((option, index) => (
					<MenuItem
						key={`${option.value}-${index}-${name}-value`}
						value={option.value}>
						{isTranslated ? t(option.label) : option.label}
					</MenuItem>
				))}
			</Select>

			{selectProps?.multiple && (
				<div className='mt-2'>
					{Array.isArray(value) &&
						value.map((valueCurrent) => (
							<Chip
								key={valueCurrent}
								label={
									options.find(
										(option) =>
											option.value === valueCurrent
									)?.label
								}
								disabled={isDisabled}
								onDelete={() => {
									const newValue = value.filter(
										(valueFilter) =>
											valueFilter !== valueCurrent
									)
									const event: SelectChangeEvent<
										string | string[]
									> = {
										target: {
											value: newValue,
											name: name
										}
									} as unknown as SelectChangeEvent<
										string | string[]
									>
									onChange(event)
								}}
							/>
						))}
				</div>
			)}
			<FormHelperText>
				{error?.message ? t(error.message) : ''}
			</FormHelperText>
		</FormControl>
	)
}

const ForwardRef = forwardRef(SelectMultiComponent)
const Memo = memo(ForwardRef)
export default Memo
