import SelectController from '@/components/Inputs/SelectController'
import TextFieldController from '@/components/Inputs/TexFieldController'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box } from '@mui/material'
import { useState } from 'react'
import Cards, { Focused } from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/lib/styles.scss'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Props } from './interfaces'
import { FormPaymentData, paymentSchema } from './utils/schema'


export default function PaymentForm({
	onCancel,
	onSubmit: onSubmitProp,
	options,
	price,
	isLoading,
	...props
}: Props) {
	const { t } = useTranslation()
	const [focus, setFocus] = useState<Focused>('name')
	const {
		watch,
		handleSubmit,
		control,
		formState: { isValid }
	} = useForm({
		resolver: yupResolver(paymentSchema),
		defaultValues: {
			amount: price
		},
		mode: 'onChange'
	})

	const cardNumber = watch('number', '')
	const cardHolder = watch('name', '')
	const expirationDate = watch('expiry', '')
	const cvv = watch('cvc', '')

	const onSubmit = (data: FormPaymentData) => {
		onSubmitProp(data)
	}

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setFocus(e.target.name as Focused)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} {...props}>
			<Cards
				cvc={cvv}
				expiry={expirationDate}
				name={cardHolder}
				number={cardNumber}
				placeholders={{ name: t('form.card.cardHolderPlaceholder') }}
				focused={focus}
			/>
			<Box
				sx={{
					display: 'flex',
					marginTop: 2,
					flexDirection: 'column',
					gap: '1rem',
					padding: '1rem'
				}}>
				<SelectController
					control={control}
					isTranslated={false}
					selectProps={{ fullWidth: true }}
					formControlProps={{ disabled: !!price }}
					label={t('form.amount')}
					name='amount'
					options={options}
				/>
				<TextFieldController
					control={control}
					fullWidth
					label={t('form.card.cardNumber')}
					type='number'
					method='maxLength'
					maxLength={16}
					onFocus={handleFocus}
					name='number'
				/>
				<TextFieldController
					control={control}
					fullWidth
					label={t('form.card.cardHolder')}
					type='text'
					onFocus={handleFocus}
					name='name'
				/>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						gap: '1rem'
					}}>
					<TextFieldController
						control={control}
						sx={{ width: '50%' }}
						method='expirationDate'
						onFocus={handleFocus}
						label={t('form.card.expirationDate')}
						name='expiry'
					/>

					<TextFieldController
						control={control}
						sx={{ width: '50%' }}
						method='cvv'
						onFocus={handleFocus}
						label={t('form.card.cvv')}
						name='cvc'
					/>
				</Box>
				<Box
					sx={{
						display: 'flex',
						marginTop: 2,
						flexDirection: 'row',
						gap: '1rem'
					}}>
					<LoadingButton
						fullWidth
						size='large'
						color='error'
						type='button'
						onClick={onCancel}
						variant='contained'>
						{t('form.cancel')}
					</LoadingButton>
					<LoadingButton
						fullWidth
						size='large'
						color='success'
						disabled={!isValid}
						loading={isLoading}
						type='submit'
						variant='contained'>
						{t('form.checkout')}
					</LoadingButton>
				</Box>
			</Box>
		</form>
	)
}
