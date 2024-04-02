import DatePickerController from '@/components/Inputs/DatePickerController'
import SelectController from '@/components/Inputs/SelectController'
import TextFieldPasswordController from '@/components/Inputs/TexFieldPasswordController'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import TextFieldController from 'components/Inputs/TexFieldController'
import schema from 'containers/Register/Full/utils/schema'
import { PropsFull } from 'containers/Register/interfaces'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './_index.scss'

export default function RegisterFullContainer({ onHandleSubmit }: PropsFull) {
	const { t } = useTranslation()
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			lastName: '',
			email: '',
			password: '',
			documentType: '',
			documentNumber: '',
			nationality: {
				country: '',
				city: ''
			},
			residence: {
				country: '',
				city: '',
				lengthOfStay: ''
			},
			birthday: '',
			gender: ''
		},
		mode: 'onChange'
	})

	const onSubmit = (data: unknown) => {
		onHandleSubmit(data)
	}
	return (
		<form className='register-form' onSubmit={handleSubmit(onSubmit)}>
			<TextFieldController
				// @ts-ignore
				control={control}
				fullWidth
				label='Correo electronico'
				name='email'
			/>
			<TextFieldPasswordController
				// @ts-ignore
				control={control}
				fullWidth
				label='Contraseña'
				name='password'
			/>
			<TextFieldController
				// @ts-ignore
				control={control}
				fullWidth
				label='Nombre'
				name='name'
			/>
			<TextFieldController
				// @ts-ignore
				control={control}
				fullWidth
				label='Apellido'
				name='lastName'
			/>
			<SelectController
				// @ts-ignore
				control={control}
				fullWidth
				label='Tipo de documento'
				name='documentType'
				options={[
					{ label: 'Cedula de ciudadania', value: 'CC' },
					{ label: 'Cedula de extranjeria', value: 'CE' }
				]}
			/>
			<TextFieldController
				// @ts-ignore
				control={control}
				fullWidth
				label='Numero de identificación'
				name='documentNumber'
			/>
			<SelectController
				// @ts-ignore
				control={control}
				fullWidth
				label='Pais de nacimiento'
				name='nationality.country'
				options={[
					{ label: 'Colombia', value: 'CO' },
					{ label: 'Venezuela', value: 'VE' }
				]}
			/>
			<SelectController
				// @ts-ignore
				control={control}
				fullWidth
				label='Ciudad de nacimiento'
				name='nationality.city'
				options={[
					{ label: 'Bogota', value: 'BOG' },
					{ label: 'Medellin', value: 'MED' }
				]}
			/>

			<SelectController
				// @ts-ignore
				control={control}
				fullWidth
				label='Pais de residencia'
				name='residence.country'
				options={[
					{ label: 'Colombia', value: 'CO' },
					{ label: 'Venezuela', value: 'VE' }
				]}
			/>
			<TextFieldController
				// @ts-ignore
				control={control}
				fullWidth
				label='Tiempo de residencia'
				name='residence.lengthOfStay'
				type='number'
			/>
			<SelectController
				// @ts-ignore
				control={control}
				fullWidth
				label='Ciudad de residencia'
				name='residence.city'
				options={[
					{ label: 'Bogota', value: 'BOG' },
					{ label: 'Medellin', value: 'MED' }
				]}
			/>
			<SelectController
				// @ts-ignore
				control={control}
				fullWidth
				label='Genero'
				name='gender'
				options={[
					{ label: 'Masculino', value: 'M' },
					{ label: 'Femenino', value: 'F' },
					{ label: 'Otro', value: 'O' },
					{ label: 'Prefiero no decir', value: 'PND' }
				]}
			/>
			<DatePickerController
				// @ts-ignore
				control={control}
				name='birthday'
				label='Fecha de nacimiento'
			/>
			<Button fullWidth size='large' type='submit' variant='contained'>
				{t('register.button-two')}
			</Button>
		</form>
	)
}
