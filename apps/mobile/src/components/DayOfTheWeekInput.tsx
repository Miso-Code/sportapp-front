import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet } from 'react-native'
import {
	Text,
	useTheme,
	Avatar,
	MD3Theme,
	TouchableRipple
} from 'react-native-paper'

const DAYS = [
	{ key: 'sunday', label: 'SUNDAY' },
	{ key: 'monday', label: 'MONDAY' },
	{ key: 'tuesday', label: 'TUESDAY' },
	{ key: 'wednesday', label: 'WEDNESDAY' },
	{ key: 'thursday', label: 'THURSDAY' },
	{ key: 'friday', label: 'FRIDAY' },
	{ key: 'saturday', label: 'SATURDAY' }
]

const localesStartingMonday = [
	'af-ZA', // Afrikaans (South Africa)
	'am-ET', // Amharic (Ethiopia)
	'ar-DZ', // Arabic (Algeria)
	'ar-LY', // Arabic (Libya)
	'ar-MA', // Arabic (Morocco)
	'az-Cyrl-AZ', // Azerbaijani (Cyrillic, Azerbaijan)
	'az-Latn-AZ', // Azerbaijani (Latin, Azerbaijan)
	'be-BY', // Belarusian (Belarus)
	'bg-BG', // Bulgarian (Bulgaria)
	'bn-BD', // Bengali (Bangladesh)
	'bs-Cyrl-BA', // Bosnian (Cyrillic, Bosnia and Herzegovina)
	'bs-Latn-BA', // Bosnian (Latin, Bosnia and Herzegovina)
	'ca-ES', // Catalan (Spain)
	'cs-CZ', // Czech (Czech Republic)
	'cy-GB', // Welsh (United Kingdom)
	'da-DK', // Danish (Denmark)
	'de-AT', // German (Austria)
	'de-CH', // German (Switzerland)
	'de-DE', // German (Germany)
	'de-LI', // German (Liechtenstein)
	'de-LU', // German (Luxembourg)
	'el-CY', // Greek (Cyprus)
	'el-GR', // Greek (Greece)
	'en-AU', // English (Australia)
	'en-GB', // English (United Kingdom)
	'en-IE', // English (Ireland)
	'en-NZ', // English (New Zealand)
	'es', // Spanish
	'es-CO', // Spanish (Colombia)
	'es-ES', // Spanish (Spain)
	'et-EE', // Estonian (Estonia)
	'eu-ES', // Basque (Spain)
	'fi-FI', // Finnish (Finland)
	'fo-FO', // Faroese (Faroe Islands)
	'fr-BE', // French (Belgium)
	'fr-CH', // French (Switzerland)
	'fr-FR', // French (France)
	'fr-LU', // French (Luxembourg)
	'ga-IE', // Irish (Ireland)
	'gl-ES', // Galician (Spain)
	'hr-HR', // Croatian (Croatia)
	'hu-HU', // Hungarian (Hungary)
	'hy-AM', // Armenian (Armenia)
	'is-IS', // Icelandic (Iceland)
	'it-CH', // Italian (Switzerland)
	'it-IT', // Italian (Italy)
	'ka-GE', // Georgian (Georgia)
	'kk-KZ', // Kazakh (Kazakhstan)
	'kl-GL', // Kalaallisut (Greenland)
	'lt-LT', // Lithuanian (Lithuania)
	'lv-LV', // Latvian (Latvia)
	'mk-MK', // Macedonian (North Macedonia)
	'mn-MN', // Mongolian (Mongolia)
	'nb-NO', // Norwegian Bokmål (Norway)
	'nl-BE', // Dutch (Belgium)
	'nl-NL', // Dutch (Netherlands)
	'nn-NO', // Norwegian Nynorsk (Norway)
	'pl-PL', // Polish (Poland)
	'pt-PT', // Portuguese (Portugal)
	'ro-RO', // Romanian (Romania)
	'ru-RU', // Russian (Russia)
	'sk-SK', // Slovak (Slovakia)
	'sl-SI', // Slovenian (Slovenia)
	'sq-AL', // Albanian (Albania)
	'sr-Cyrl-RS', // Serbian (Cyrillic, Serbia)
	'sr-Latn-RS', // Serbian (Latin, Serbia)
	'sv-FI', // Swedish (Finland)
	'sv-SE', // Swedish (Sweden)
	'tr-TR', // Turkish (Turkey)
	'uk-UA' // Ukrainian (Ukraine)
]

const DayOfTheWeekInput = ({ value, onChange, disabled = false, label }) => {
	const theme = useTheme()
	const { t, i18n } = useTranslation()
	const styles = createStyles(theme)

	const [selectedDays, setSelectedDays] = useState(value)

	if (
		localesStartingMonday.includes(i18n.language) &&
		DAYS[0].key !== 'monday'
	) {
		DAYS.push(DAYS.shift() as (typeof DAYS)[number]) // Move Sunday to the end
	}

	const handleDayPress = (day: string) => {
		if (selectedDays.includes(day)) {
			setSelectedDays(selectedDays.filter((d) => d !== day))
		} else {
			setSelectedDays([...selectedDays, day])
		}
	}

	useEffect(() => {
		if (onChange) onChange(selectedDays)
	}, [selectedDays, onChange])

	return (
		<>
			<Text variant='bodyMedium' style={disabled && styles.disabled}>
				{label}
			</Text>
			<View style={styles.container}>
				{DAYS.map((day) => (
					<TouchableRipple
						key={day.key}
						onPress={() => handleDayPress(day.key)}
						style={styles.ripple}
						borderless
						disabled={disabled}>
						<Avatar.Text
							testID={
								selectedDays.includes(day.key)
									? 'activeDay'
									: 'inactiveDay'
							}
							size={36}
							color={
								disabled
									? theme.colors.onSurfaceDisabled
									: selectedDays.includes(day.key)
									? theme.colors.onPrimary
									: theme.colors.primary
							}
							style={
								disabled && selectedDays.includes(day.key)
									? styles.disabledActive
									: disabled &&
									  !selectedDays.includes(day.key)
									? styles.disabled
									: selectedDays.includes(day.key)
									? styles.active
									: styles.inactive
							}
							label={t(`form.daysOfTheWeekValues.${day.label}`)}
						/>
					</TouchableRipple>
				))}
			</View>
		</>
	)
}

const createStyles = (theme: MD3Theme) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			justifyContent: 'center',
			gap: 10
		},
		active: {
			backgroundColor: theme.colors.primary,
			borderColor: theme.colors.primary,
			borderWidth: 1
		},
		inactive: {
			backgroundColor: theme.colors.onPrimary,
			borderColor: theme.colors.primary,
			borderWidth: 1
		},
		ripple: {
			borderRadius: 50
		},
		disabledActive: {
			backgroundColor: theme.colors.onSurfaceDisabled,
			borderColor: 'transparent',
			borderWidth: 1
		},
		disabled: {
			color: theme.colors.onSurfaceDisabled,
			backgroundColor: 'transparent',
			borderColor: 'transparent',
			borderWidth: 1
		}
	})

export default DayOfTheWeekInput
