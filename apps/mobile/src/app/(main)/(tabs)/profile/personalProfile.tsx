import React, { useEffect, useState } from 'react'

import { ScrollView, StyleSheet, View } from 'react-native'
import { TextInput, HelperText, ActivityIndicator } from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates'
import { useTranslation } from 'react-i18next'

import { useUserStore, useAlertStore } from '@sportapp/stores'

import Dropdown from '@/components/Dropdown'
import { getCitiesOfCountry, countries } from '@/utils/countries'
import SquaredButton from '@/components/SquaredButton'

const PersonalProfile: React.FC = () => {
	const { t, i18n } = useTranslation()
	const { user, updateProfile, getProfile } = useUserStore()
	const { setAlert } = useAlertStore()

	const [isEditing, setIsEditing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showActivityIndicator, setShowActivityIndicator] = useState(true)

	const [citiesOnBornCountry, setCitiesOnBornCountry] = useState([])
	const [citiesOnResidenceCountry, setCitiesOnResidenceCountry] = useState([])

	const [email, setEmail] = useState(user?.profileData?.email ?? '')
	const [password, setPassword] = useState('FakePassword123@')
	const [firstName, setFirstName] = useState(
		user?.profileData?.first_name ?? ''
	)
	const [lastName, setLastName] = useState(user?.profileData?.last_name ?? '')
	const [dniType, setDniType] = useState(
		user?.profileData?.identification_type ?? ''
	)
	const [dniNumber, setDniNumber] = useState(
		user?.profileData?.identification_number ?? ''
	)
	const [bornCountry, setBornCountry] = useState(
		user?.profileData?.country_of_birth ?? ''
	)
	const [bornCity, setBornCity] = useState(
		user?.profileData?.city_of_birth ?? ''
	)
	const [residenceCountry, setResidenceCountry] = useState(
		user?.profileData?.country_of_residence ?? ''
	)
	const [residenceYears, setResidenceYears] = useState(
		user?.profileData?.residence_age.toString() ?? ''
	)
	const [residenceCity, setResidenceCity] = useState(
		user?.profileData?.city_of_residence ?? ''
	)
	const [gender, setGender] = useState(user?.profileData?.gender ?? '')
	const [birthDate, setBirthDate] = useState<Date>(
		user?.profileData?.birth_date
			? new Date(user?.profileData?.birth_date)
			: undefined
	)

	const emailHasErrors = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return !emailRegex.test(email) && email.length > 0
	}

	const passwordHasErrors = () => {
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		return !passwordRegex.test(password) && password.length > 0
	}

	const handleUpdatePersonalProfile = async () => {
		setIsLoading(true)
		setIsEditing(false)
		await updateProfile({
			email,
			first_name: firstName,
			last_name: lastName,
			identification_type: dniType,
			identification_number: dniNumber,
			country_of_birth: bornCountry,
			city_of_birth: bornCity,
			country_of_residence: residenceCountry,
			residence_age: parseInt(residenceYears, 10),
			city_of_residence: residenceCity,
			gender: gender,
			birth_date: birthDate.toISOString()
		})
		setIsLoading(false)
		setAlert({
			message: t('personalDataForm.success'),
			type: 'success'
		})
	}

	useEffect(() => {
		if (!bornCountry) return
		const cities = getCitiesOfCountry(bornCountry)
		setCitiesOnBornCountry(cities)
		if (!cities.find((city) => city.value === bornCity)) {
			setBornCity('')
		}
	}, [bornCountry, bornCity])

	useEffect(() => {
		if (!residenceCountry) return
		const cities = getCitiesOfCountry(residenceCountry)
		setCitiesOnResidenceCountry(cities)
		if (!cities.find((city) => city.value === residenceCity)) {
			setResidenceCity('')
		}
	}, [residenceCountry, residenceCity])

	useEffect(() => {
		;(async () => {
			await getProfile()
			setShowActivityIndicator(false)
		})()
	}, [getProfile])

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{showActivityIndicator ? (
				<ActivityIndicator size='large' />
			) : (
				<View style={styles.wrapper}>
					<TextInput
						testID='text-input-email'
						label={t('form.email')}
						value={email}
						onChangeText={setEmail}
						mode='outlined'
						error={emailHasErrors()}
						disabled={true}
					/>
					{emailHasErrors() && (
						<HelperText
							type='error'
							visible={emailHasErrors()}
							testID='error-helper-text'>
							{t('validations.email')}
						</HelperText>
					)}
					<TextInput
						testID='text-input-password'
						label={t('form.password')}
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						mode='outlined'
						error={passwordHasErrors()}
						onPressIn={() => setPassword('')}
						disabled={true}
					/>
					{passwordHasErrors() && (
						<HelperText
							type='error'
							visible={passwordHasErrors()}
							testID='error-helper-text'>
							{t('validations.password.restrictions')}
						</HelperText>
					)}
					<TextInput
						testID='text-input-first-name'
						label={t('form.name')}
						value={firstName}
						onChangeText={setFirstName}
						mode='outlined'
						disabled={!isEditing}
					/>
					<TextInput
						testID='text-input-last-name'
						label={t('form.lastName')}
						value={lastName}
						onChangeText={setLastName}
						mode='outlined'
						disabled={!isEditing}
					/>
					<Dropdown
						testID='dropdown-dni-type'
						items={[
							{
								label: t('form.documentTypeValues.CC'),
								value: 'CC'
							},
							{
								label: t('form.documentTypeValues.CE'),
								value: 'CE'
							},
							{
								label: t('form.documentTypeValues.PA'),
								value: 'PA'
							}
						]}
						label={t('form.documentType')}
						value={dniType}
						onSelect={setDniType}
						disabled={!isEditing}
					/>
					<TextInput
						testID='text-input-dni-number'
						label={t('form.documentNumber')}
						value={dniNumber}
						onChangeText={setDniNumber}
						mode='outlined'
						disabled={!isEditing}
					/>
					<Dropdown
						testID='dropdown-born-country'
						items={countries}
						label={t('form.nationalityCountry')}
						value={bornCountry}
						onSelect={setBornCountry}
						searchable
						disabled={!isEditing}
					/>
					<Dropdown
						testID='dropdown-born-city'
						items={citiesOnBornCountry}
						label={t('form.nationalityCity')}
						value={bornCity}
						onSelect={setBornCity}
						searchable
						disabled={!isEditing}
					/>
					<Dropdown
						testID='dropdown-residence-country'
						items={countries}
						label={t('form.residenceCountry')}
						value={residenceCountry}
						onSelect={setResidenceCountry}
						searchable
						disabled={!isEditing}
					/>
					<TextInput
						testID='text-input-residence-years'
						label={t('form.residenceLengthOfStay')}
						value={residenceYears}
						onChangeText={setResidenceYears}
						mode='outlined'
						keyboardType='numeric'
						disabled={!isEditing}
					/>
					<Dropdown
						testID='dropdown-residence-city'
						items={citiesOnResidenceCountry}
						label={t('form.residenceCity')}
						value={residenceCity}
						onSelect={setResidenceCity}
						searchable
						disabled={!isEditing}
					/>
					<Dropdown
						testID='dropdown-gender'
						items={[
							{ label: t('form.genderValues.MALE'), value: 'M' },
							{
								label: t('form.genderValues.FEMALE'),
								value: 'F'
							},
							{ label: t('form.genderValues.OTHER'), value: 'O' }
						]}
						label={t('form.gender')}
						value={gender}
						onSelect={setGender}
						mode='outlined'
						disabled={!isEditing}
					/>
					<DatePickerInput
						testID='date-picker-birth-date'
						locale={i18n.language}
						label={t('form.birthDate')}
						value={birthDate}
						onChange={setBirthDate}
						inputMode='start'
						mode='outlined'
						disabled={!isEditing}
					/>
					<SquaredButton
						value={
							isLoading
								? ''
								: isEditing
								? t('personalDataForm.save')
								: t('personalDataForm.edit')
						}
						onPress={() =>
							isLoading
								? {}
								: isEditing
								? handleUpdatePersonalProfile()
								: setIsEditing(true)
						}
						disabled={
							emailHasErrors() ||
							passwordHasErrors() ||
							email.length === 0 ||
							password.length === 0
						}
						loading={isLoading}
					/>
					{isEditing && (
						<SquaredButton
							value={t('personalDataForm.cancel')}
							onPress={() => setIsEditing(false)}
							mode='outlined'
						/>
					)}
				</View>
			)}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15,
		marginTop: 120
	},
	wrapper: {
		width: '100%',
		gap: 10,
		marginBottom: 200
	}
})

export default PersonalProfile
