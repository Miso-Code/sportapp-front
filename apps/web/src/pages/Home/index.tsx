import ContainerLayout from '@/components/ContainerLayout'
import NutritionalDataForm from '@/containers/NutritionalDataForm'
import PersonalDataForm from '@/containers/PersonalDataForm'
import SportDataForm from '@/containers/SportDataForm'
import ProfileMenu from '@/pages/Home/components/Menu'
import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './_index.scss'
import { handleEdit } from './components/Menu/utils'

function Home() {
	const { t } = useTranslation()
	const [selected, setSelected] = useState(-1)
	const [isEditing, setIsEditing] = useState<boolean[]>([
		true,
		true,
		true,
		true
	])

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
			handleCustomSubmit={() => {
				handleEdit(0, isEditing, setIsEditing)
			}}
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
