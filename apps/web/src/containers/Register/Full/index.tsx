import { getCitiesOfCountry, getCountries } from '@/utils/contries'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import DatePickerController from 'components/Inputs/DatePickerController'
import SelectController from 'components/Inputs/SelectController'
import TextFieldController from 'components/Inputs/TexFieldController'
import TextFieldPasswordController from 'components/Inputs/TexFieldPasswordController'
import schema from 'containers/Register/Full/utils/schema'
import { PropsFull } from 'containers/Register/interfaces'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './_index.scss'

export default function RegisterFullContainer({ onHandleSubmit }: PropsFull) {
	const { t } = useTranslation()
	const contries = getCountries
	const { watch, handleSubmit, control } = useForm({
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
		console.log(data)

		onHandleSubmit(data)
	}

	const nationalityCountry = watch('nationality.country')
	const residenceCountry = watch('residence.country')

	return (
		<form className='register-form' onSubmit={handleSubmit(onSubmit)}>
			<TextFieldController
				control={control}
				fullWidth
				label='Correo electronico'
				name='email'
			/>
			<TextFieldPasswordController
				control={control}
				fullWidth
				label='Contraseña'
				name='password'
			/>
			<TextFieldController
				control={control}
				fullWidth
				label='Nombre'
				name='name'
			/>
			<TextFieldController
				control={control}
				fullWidth
				label='Apellido'
				name='lastName'
			/>
			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label='Tipo de documento'
				name='documentType'
				options={[
					{ label: 'Cedula de ciudadania', value: 'CC' },
					{ label: 'Cedula de extranjeria', value: 'CE' }
				]}
			/>

			<TextFieldController
				control={control}
				fullWidth
				label='Numero de identificación'
				name='documentNumber'
			/>

			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label='Pais de nacimiento'
				name='nationality.country'
				options={contries}
				isTranslated={false}
			/>

			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label='Ciudad de nacimiento'
				name='nationality.city'
				options={getCitiesOfCountry(nationalityCountry)}
				isTranslated={false}
			/>

			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label='Pais de residencia'
				name='residence.country'
				options={contries}
				isTranslated={false}
			/>
			<TextFieldController
				control={control}
				fullWidth
				label='Tiempo de residencia'
				name='residence.lengthOfStay'
				type='number'
			/>
			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label='Ciudad de residencia'
				name='residence.city'
				options={getCitiesOfCountry(residenceCountry)}
				isTranslated={false}
			/>
			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
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
