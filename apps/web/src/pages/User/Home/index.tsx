import ContainerLayout from '@/components/ContainerLayout'
import NutritionalDataForm from '@/containers/NutritionalDataForm'
import {
	FormDataBase as NutritionalBaseFormData,
	FormDataRequired as NutritionalFormData
} from '@/containers/NutritionalDataForm/utils/schema'
import PaymentPlans from '@/containers/PaymentPlans'
import PersonalDataForm from '@/containers/PersonalDataForm'
import { FormData as PersonalFormData } from '@/containers/PersonalDataForm/utils/schema'
import SportDataForm from '@/containers/SportDataForm'
import {
	FormDataBase as SportDataBase,
	FormDataRequired as SportFormData
} from '@/containers/SportDataForm/utils/schema'
import ProfileMenu from '@/pages/User/Home/components/Menu'
import { Button, Typography } from '@mui/material'
import { NutritionalProfileUpdateRequest } from '@sportapp/sportapp-repository/src/user/interfaces/api/nutritionalProfile'
import { PersonalProfileUpdateRequest } from '@sportapp/sportapp-repository/src/user/interfaces/api/personalProfile'
import { SportProfileUpdateRequest } from '@sportapp/sportapp-repository/src/user/interfaces/api/sportProfile'
import { useUserStore } from '@sportapp/stores/src/user'
import { format, parse } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './_index.scss'
import { handleEdit } from './components/Menu/utils'

function HomePage() {
	const { t } = useTranslation()
	const {
		getProfile,
		updateProfile,
		getSport,
		updateSport,
		getNutrition,
		updateNutrition
	} = useUserStore()
	const { user } = useUserStore()
	const [selected, setSelected] = useState(-1)
	const [isEditing, setIsEditing] = useState<boolean[]>([
		true,
		true,
		true,
		true
	])

	const handleAllAsyncProfileData = useCallback(async () => {
		await getProfile()
		await getSport()
		await getNutrition()
	}, [getNutrition, getProfile, getSport])

	const handleUpdateProfile = useCallback(
		async (data: PersonalFormData) => {
			const payload: PersonalProfileUpdateRequest = {
				email: data.email,
				first_name: data.name,
				last_name: data.lastName,
				birth_date: format(data.birthday, 'yyyy-MM-dd'),
				city_of_birth: data.nationality.city,
				country_of_birth: data.nationality.country,
				city_of_residence: data.residence.city,
				country_of_residence: data.residence.country,
				gender: data.gender,
				identification_number: data.documentNumber,
				identification_type: data.documentType,
				residence_age: parseInt(data.residence.lengthOfStay)
			}
			await updateProfile(payload)
			await getProfile()
			handleEdit(0, isEditing, setIsEditing)
		},
		[getProfile, isEditing, updateProfile]
	)

	const handleUpdateSportProfile = useCallback(
		async (data: SportFormData) => {
			const heightPayload = data.height > 0 ? data.height : 0

			const payload: SportProfileUpdateRequest = {
				available_training_hours: data.availableTrainingHoursPerDay,
				available_weekdays:
					data.weekdays as SportProfileUpdateRequest['available_weekdays'],
				preferred_training_start_time: data.preferedTrainingStartTime,
				favourite_sport_id: data.favouriteSportId,
				height: heightPayload,
				training_limitations: data.limitations.map((limitation) => {
					if (!limitation.limitation_id) {
						return {
							description: limitation.description,
							name: limitation.name
						}
					}

					return {
						description: limitation.description,
						name: limitation.name,
						limitation_id: limitation.limitation_id
					}
				}),
				training_objective: data.trainingObjective,
				weight: data.weight
			}

			await updateSport(payload)
			await getSport()
			handleEdit(1, isEditing, setIsEditing)
		},
		[getSport, isEditing, updateSport]
	)

	const handleUpdateNutritionalProfile = useCallback(
		async (data: NutritionalFormData) => {
			const payload: NutritionalProfileUpdateRequest = {
				food_preference: data.foodPreferences ?? '',
				nutritional_limitations: data.allergyType as string[]
			}
			await updateNutrition(payload)
			await getNutrition()
			handleEdit(2, isEditing, setIsEditing)
		},
		[getNutrition, isEditing, updateNutrition]
	)

	useEffect(() => {
		handleAllAsyncProfileData()
	}, [handleAllAsyncProfileData])

	useEffect(() => {
		setIsEditing([true, true, true, true])
	}, [selected])

	const selectedViews = [
		<PersonalDataForm
			key='personalDataForm'
			customSubmit={
				isEditing[0] && (
					<Button
						fullWidth
						size='large'
						type='submit'
						className='home-custom-button home-custom-button__max-w-md'
						onClick={() => handleEdit(0, isEditing, setIsEditing)}
						variant='contained'>
						{t('personalDataForm.edit')}
					</Button>
				)
			}
			defaultValues={{
				birthday: parse(
					user?.profileData?.birth_date ?? '',
					"yyyy-MM-dd'T'HH:mm:ss",
					new Date()
				),
				documentNumber: user?.profileData?.identification_number ?? '',
				documentType: user?.profileData?.identification_type ?? '',
				gender: user?.profileData?.gender ?? '',
				lastName: user?.profileData?.last_name ?? '',
				name: user?.profileData?.first_name ?? '',
				nationality: {
					city: user?.profileData?.city_of_birth ?? '',
					country: user?.profileData?.country_of_birth ?? ''
				},
				residence: {
					city: user?.profileData?.city_of_residence ?? '',
					country: user?.profileData?.country_of_residence ?? '',
					lengthOfStay: `${user?.profileData?.residence_age}`
				},
				email: user?.profileData?.email ?? '',
				password: '*********'
			}}
			handleCustomSubmit={handleUpdateProfile}
			inputsDisabled={isEditing[0]}
			className='mt-10 px-3'
		/>,
		<SportDataForm
			key='sportDataForm'
			customSubmit={
				isEditing[1] && (
					<Button
						fullWidth
						size='large'
						type='submit'
						className='home-custom-button home-custom-button__max-w-md'
						onClick={() => handleEdit(1, isEditing, setIsEditing)}
						variant='contained'>
						{t('sportDataForm.edit')}
					</Button>
				)
			}
			defaultValues={{
				weight: user?.sportData?.weight ?? 0,
				height: (user?.sportData?.height ?? 0) * 10,
				imc: user?.sportData?.bmi ?? 0,
				trainingObjective:
					user?.sportData?.training_objective ?? 'BUILD_MUSCLE_MASS',
				weekdays: user?.sportData?.available_weekdays ?? [],
				preferedTrainingStartTime:
					user?.sportData?.preferred_training_start_time ?? '',
				favouriteSportId: user?.sportData?.favourite_sport_id ?? '',
				availableTrainingHoursPerDay:
					user?.sportData?.available_training_hours ?? 0,
				limitations: user?.sportData?.training_limitations ?? []
			}}
			isRequired
			handleCustomSubmit={
				handleUpdateSportProfile as (
					data: SportDataBase | SportFormData
				) => void
			}
			inputsDisabled={isEditing[1]}
			className='mt-10 px-3'
		/>,
		<NutritionalDataForm
			key='nutritionalDataForm'
			customSubmit={
				isEditing[2] && (
					<Button
						fullWidth
						size='large'
						type='submit'
						className='home-custom-button home-custom-button__max-w-md'
						onClick={() => handleEdit(2, isEditing, setIsEditing)}
						variant='contained'>
						{t('nutritionalDataForm.edit')}
					</Button>
				)
			}
			isRequired
			defaultValues={{
				allergyType: user?.nutritionData?.nutritional_limitations ?? [],
				foodPreferences: user?.nutritionData?.food_preference ?? ''
			}}
			handleCustomSubmit={
				handleUpdateNutritionalProfile as (
					data: NutritionalFormData | NutritionalBaseFormData
				) => void
			}
			inputsDisabled={isEditing[2]}
			className='mt-10 px-3'
		/>,
		<PaymentPlans />
	]

	return (
		<ContainerLayout
			className='home'
			secondarySection={selectedViews[selected]}>
			<section className='home-section'>
				<Typography className='home-title' variant='h3'>
					{t('profile.title')}
				</Typography>
				<ProfileMenu
					className='mt-14'
					fullName={`${user?.profileData?.first_name} ${user?.profileData?.last_name}`}
					email={user?.profileData?.email}
					selected={selected}
					setSelected={setSelected}
				/>
			</section>
		</ContainerLayout>
	)
}

export default HomePage
