import ContainerLayout from '@/components/ContainerLayout'
import NutritionalDataForm from '@/containers/NutritionalDataForm'
import PersonalDataForm from '@/containers/PersonalDataForm'
import SportDataForm from '@/containers/SportDataForm'
import ProfileMenu from '@/pages/Home/components/Menu'
import { Button, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './_index.scss'
import { handleEdit } from './components/Menu/utils'
import { useUserStore } from '@sportapp/stores/src/user'
import { FormData as PersonalFormData } from '@/containers/PersonalDataForm/utils/schema'
import { PersonalProfileUpdateRequest } from '@sportapp/sportapp-repository/src/user/interfaces/api/personalProfile'

function Home() {
	const { t } = useTranslation()
	const { getProfile, updateProfile } = useUserStore()
	const { user } = useUserStore()
	const [selected, setSelected] = useState(-1)
	const [isEditing, setIsEditing] = useState<boolean[]>([
		true,
		true,
		true,
		true
	])

	const handleGetProfileData = useCallback(async () => {
		await getProfile()
	}, [getProfile])

	const handleUpdateProfile = useCallback(
		async (data: PersonalFormData) => {
			const payload: PersonalProfileUpdateRequest = {
				birth_date: data.birthday,
				city_of_birth: data.nationality.city,
				country_of_birth: data.nationality.country,
				city_of_residence: data.residence.city,
				country_of_residence: data.residence.country,
				email: data.email,
				first_name: data.name,
				last_name: data.lastName,
				gender: data.gender,
				identification_number: data.documentNumber,
				identification_type: data.documentType,
				residence_age: parseInt(data.residence.lengthOfStay)
			}
			await updateProfile(payload)
		},
		[updateProfile]
	)

	useEffect(() => {
		handleGetProfileData()
	}, [handleGetProfileData])

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
				birthday: '',
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
					lengthOfStay:
						user?.profileData?.residence_age.toString() ?? ''
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
			isRequired
			handleCustomSubmit={() => {
				handleEdit(1, isEditing, setIsEditing)
			}}
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
			handleCustomSubmit={() => {
				handleEdit(2, isEditing, setIsEditing)
			}}
			inputsDisabled={isEditing[2]}
			className='mt-10 px-3'
		/>,
		<div>Planes de pago</div>
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
					fullName='Jhon Doe'
					email='jdoe@gmail.com'
					selected={selected}
					setSelected={setSelected}
				/>
			</section>
		</ContainerLayout>
	)
}

export default Home
