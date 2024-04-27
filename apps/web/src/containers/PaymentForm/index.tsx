import SelectController from '@/components/Inputs/SelectController'
import TextFieldController from '@/components/Inputs/TexFieldController'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { useState } from 'react'
import Cards, { Focused } from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/lib/styles.scss'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { generateLabelValuePairs } from './utils'
import { FormPaymentData, paymentSchema } from './utils/schema'
import { Props } from './interfaces'

const amountOptions = generateLabelValuePairs(10)

export default function PaymentForm({
	onCancel,
	onSubmit: onSubmitProp,
	...props
}: Props) {
	const { t } = useTranslation()
	const [focus, setFocus] = useState<Focused>('name')
	const { watch, handleSubmit, control } = useForm({
		resolver: yupResolver(paymentSchema),
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
			<section className='flex flex-col gap-4 p-4 mt-2'>
				<SelectController
					control={control}
					isTranslated={false}
					selectProps={{ fullWidth: true }}
					label={t('form.amount')}
					name='amount'
					options={amountOptions}
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
				<div className='flex gap-4'>
					<TextFieldController
						control={control}
						className='w-1/2'
						method='expirationDate'
						onFocus={handleFocus}
						label={t('form.card.expirationDate')}
						name='expiry'
					/>

					<TextFieldController
						control={control}
						className='w-1/2'
						method='cvv'
						onFocus={handleFocus}
						label={t('form.card.cvv')}
						name='cvc'
					/>
				</div>
				<div className='flex md:flex-row gap-4 mt-2'>
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
						type='submit'
						variant='contained'>
						{t('form.checkout')}
					</LoadingButton>
				</div>
			</section>
		</form>
	)
}
