import InputFileUploadController from '@/components/Inputs/FileUploadController'
import MarckDownController from '@/components/Inputs/MarckDownController'
import RadioButtonController from '@/components/Inputs/RadioButtonController'
import SelectController from '@/components/Inputs/SelectController'
import TextFieldController from '@/components/Inputs/TexFieldController'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './_index.scss'
import {
	PaymentFrequency,
	PaymentType,
	ProductCategory,
	Props
} from './interfaces'
import schema, { FormData } from './utils/schema'
import { toBase64 } from '@/utils/files'
import { useEffect, useState } from 'react'

export default function CreateProduct({
	className,
	onHandleSubmit,
	disabled,
	isLoading,
	...props
}: Props) {
	const { t } = useTranslation()
	const [imagePreview, setImagePreview] = useState('')
	const {
		handleSubmit,
		watch,
		control,
		formState: { isValid }
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			category: '',
			name: '',
			summary: '',
			url: '',
			price: 0,
			paymentType: '',
			paymentFrequency: PaymentFrequency.OTHER,
			stock: 0,
			description: '',
			image_base64: ''
		},
		mode: 'onChange'
	})

	const watchTypeImage = watch('typeImage')
	const watchImageBase64 = watch('image_base64')
	const watchImageUrl = watch('imageUrl')
	const watchPaymentType = watch('paymentType')

	const onSubmit = (data: FormData) => {
		onHandleSubmit(data)
	}

	const handleShowPreview = async (file: File) => {
		return await toBase64(file)
	}

	useEffect(() => {
		if (watchTypeImage === 'false') {
			setImagePreview(watchImageUrl as string)
		} else {
			handleShowPreview(watchImageBase64 as File).then((result) => {
				setImagePreview(result)
			})
		}
	}, [watchImageBase64, watchImageUrl, watchTypeImage])

	return (
		<form
			className={`create-product-form ${className}`}
			onSubmit={handleSubmit(onSubmit)}
			{...props}>
			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label={t('form.productCategory')}
				name='category'
				options={[
					{
						label: 'form.productCategoryValues.equipment',
						value: ProductCategory.EQUIPMENT
					},
					{
						label: 'form.productCategoryValues.apparel',
						value: ProductCategory.APPAREL
					},
					{
						label: 'form.productCategoryValues.nutrition',
						value: ProductCategory.NUTRITION
					},
					{
						label: 'form.productCategoryValues.training_services',
						value: ProductCategory.TRAINING_SERVICES
					},
					{
						label: 'form.productCategoryValues.wellness',
						value: ProductCategory.WELLNESS
					},
					{
						label: 'form.productCategoryValues.sports_technology',
						value: ProductCategory.SPORTS_TECHNOLOGY
					},
					{
						label: 'form.productCategoryValues.medical_services',
						value: ProductCategory.MEDICAL_SERVICES
					}
				]}
			/>
			<TextFieldController
				control={control}
				fullWidth
				label={t('form.productName')}
				name='name'
			/>
			<TextFieldController
				control={control}
				fullWidth
				type='url'
				label={t('form.productUrl')}
				name='url'
			/>
			<TextFieldController
				control={control}
				fullWidth
				type='number'
				inputProps={{ startAdornment: '$' }}
				label={t('form.productPrice')}
				name='price'
			/>
			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label={t('form.paymentType')}
				name='paymentType'
				options={[
					{
						label: 'form.paymentTypeValues.unique',
						value: PaymentType.UNIQUE
					},
					{
						label: 'form.paymentTypeValues.periodic',
						value: PaymentType.PERIODIC
					}
				]}
			/>
			{watchPaymentType === PaymentType.PERIODIC && (
				<SelectController
					control={control}
					selectProps={{ fullWidth: true }}
					label={t('form.paymentFrequency')}
					name='paymentFrequency'
					options={[
						{
							label: 'form.paymentFrequencyValues.weekly',
							value: PaymentFrequency.WEEKLY
						},
						{
							label: 'form.paymentFrequencyValues.monthly',
							value: PaymentFrequency.MONTHLY
						},
						{
							label: 'form.paymentFrequencyValues.annually',
							value: PaymentFrequency.ANNUALLY
						},
						{
							label: 'form.paymentFrequencyValues.bi_annually',
							value: PaymentFrequency.BI_ANNUALLY
						},
						{
							label: 'form.paymentFrequencyValues.quarterly',
							value: PaymentFrequency.QUARTERLY
						},
						{
							label: 'form.paymentFrequencyValues.other',
							value: PaymentFrequency.OTHER
						}
					]}
				/>
			)}
			<TextFieldController
				control={control}
				fullWidth
				type='number'
				label={t('form.productStock')}
				name='stock'
			/>
			<RadioButtonController
				control={control}
				fullWidth
				label={t('form.productImageType')}
				name='typeImage'
				options={[
					{
						label: 'form.imageTypeValues.url',
						value: 'false'
					},
					{
						label: 'form.imageTypeValues.file',
						value: 'true'
					}
				]}
			/>
			{watchTypeImage === 'false' && (
				<TextFieldController
					control={control}
					fullWidth
					type='url'
					label={t('form.productImageUrl')}
					name='imageUrl'
				/>
			)}
			{watchTypeImage === 'true' && (
				<InputFileUploadController
					label={t('form.productImageFile')}
					className='w-full'
					control={control}
					name='image_base64'
					placeHolder={t('form.file.placeholder')}
				/>
			)}
			{!!watchTypeImage && imagePreview && (
				<img
					src={imagePreview}
					alt='preview'
					className='w-full aspect-video border object-contain rounded-lg shadow-md m-4'
				/>
			)}
			<TextFieldController
				control={control}
				fullWidth
				type='text'
				label={t('form.productSummary')}
				name='summary'
			/>
			<MarckDownController
				control={control}
				label={t('form.productDescription')}
				name='description'
			/>
			<LoadingButton
				fullWidth
				disabled={!isValid || disabled}
				loading={isLoading}
				type='submit'
				variant='contained'>
				{t('form.createProduct')}
			</LoadingButton>
		</form>
	)
}
